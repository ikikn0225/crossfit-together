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
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private readonly usersService:UserService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context).getContext();
        if (!ctx.headers.authorization) {
        return false;
        }
        
        await this.validateToken(ctx.headers.authorization, ctx);
        
        return true;
    }

    async validateToken(auth: string, ctx: any) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        const token = auth.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
            const { user } = await this.usersService.findById(decoded["id"]);
            if(!user) return false;
            ctx['user'] = user;
            return true;
        } catch (err) {
            const message = 'Token error: ' + (err.message || err.name);
            throw new HttpException(message, HttpStatus.UNAUTHORIZED);
        }
    }
}