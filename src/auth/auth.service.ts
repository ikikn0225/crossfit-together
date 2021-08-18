import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { encryptValue } from 'src/crypto';
import { TokenUser } from 'src/decorators/user.decorator';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<TokenUser | null> {
        const user = await this.userService.getByUserId(email);
        const isCompared = await user?.checkPassword(password);

        if (!isCompared || !user) return null;
console.log(user.id);

        return { id: user.id };
    }

    async signin(payload: TokenUser) {
        
        const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '14d' });

        await this.userService.updateRefreshToken(payload.id, refreshToken);
        console.log(accessToken);
        return encryptValue(accessToken);
    }

    async verifyRefresh(id: number) {
        const user = await this.userService.getById(id);

        if (!user) return false;
        return user.verifyRefresh();
    }
}