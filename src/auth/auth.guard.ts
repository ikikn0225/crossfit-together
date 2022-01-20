import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { decryptValue } from 'src/crypto';
import { JwtService } from 'src/jwt/jwt.service';
import { UserService } from 'src/user/user.service';
import { AllowedRoles } from './role-decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector, private readonly usersService:UserService, private readonly jwtService: JwtService,) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<AllowedRoles>('roles', context.getHandler(),);
        
        if(!roles) {
            return true;
        }
        const ctx = GqlExecutionContext.create(context).getContext();
        
        if (!ctx.headers.authorization) {
            return false;
        }
        // console.log(ctx.headers);
        
        ctx.user = await this.validateToken(ctx.headers.authorization);
        if(roles.includes('Any'))
            return true;
        return roles.includes(ctx.user.role);
    }

    async validateToken(accessToken: string) {
        // let token:string;
        // console.log(refreshToken);
        
        // if (accessToken.split(' ')[0] !== 'Bearer') {
        //     if (refreshToken.split(' ')[0] !== 'Bearer') {
        //         throw new HttpException('Invalid accessToken', HttpStatus.UNAUTHORIZED);
        //     }else {
        //         const decoded = jwt.verify(decryptValue(refreshToken.split(' ')[1]), process.env.PRIVATE_KEY);
        //         const { user } = await this.usersService.findById(decoded["id"]);
        //         // const isVerifiedToken = await user.verifyRefresh();
        //         // if(!isVerifiedToken) throw new HttpException('Invalid refreshToken', HttpStatus.UNAUTHORIZED);
        //         token = await this.jwtService.sign(user.id, '1m');
        //     }
        // } else {
        //     token = accessToken.split(' ')[1];
        // }

        try {
            const decoded = jwt.verify(decryptValue(accessToken.split(' ')[1]), process.env.PRIVATE_KEY);
            const { user } = await this.usersService.findById(decoded["id"]);
            return user;
        } catch (err) {
            return true;
            // const message = 'Token error: ' + (err.message || err.name);
            // throw new HttpException(message, HttpStatus.UNAUTHORIZED);
        }
    }
}