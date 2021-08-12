  
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { ExpriedJwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginInput, LoginOutput } from 'src/user/dtos/login.dto';
import { TokenUser } from 'src/decorators/user.decorator';
import { AuthUser } from './auth-user.decorator';
import { UserDeco } from '../decorators/user.decorator'
import { User } from 'src/user/entities/user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from 'src/common/common.constants';
import { CoreOutput } from 'src/common/dtos/common.dto';

const EXPIRED = 1000 * 60 * 60 * 24 * 7;

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService, private userService: UserService) {}

    @UseGuards(LocalAuthGuard)
    @Mutation((returns) => LoginOutput)
    async signin(
        @Args('input') _: LoginInput,
        @UserDeco() user: TokenUser,
        @Context() { res }: { res: Response },
    ): Promise<LoginOutput> {
        
        const accessToken = await this.authService.signin({ id: user.id });
        
        res.cookie(jwtConstants.header, accessToken, {
        httpOnly: true,
        maxAge: EXPIRED,
        });

        return { ok: true, token: accessToken };
    }

    @UseGuards(ExpriedJwtAuthGuard)
    @Mutation((returns) => CoreOutput)
    async refresh(
        @AuthUser() user: User,
        @Context() { res }: { res: Response },
    ): Promise<CoreOutput> {
        if (!user) return { ok: false };
        const isVerifiedToken = await this.authService.verifyRefresh(user.id);

        if (!isVerifiedToken) return { ok: false, error: 'expried refresh token' };

        const accessToken = await this.authService.signin({ id: user.id });
        res.cookie(jwtConstants.header, accessToken, {
        httpOnly: true,
        maxAge: EXPIRED,
        });

        return { ok: true };
    }

    @UseGuards(ExpriedJwtAuthGuard)
    @Mutation((returns) => CoreOutput)
    async logout(
        @AuthUser() user: TokenUser,
        @Context() { res }: { res: Response },
    ): Promise<CoreOutput> {
        await this.userService.updateRefreshToken(user.id, null);

        res.clearCookie(jwtConstants.header);

        return { ok: true };
    }
}