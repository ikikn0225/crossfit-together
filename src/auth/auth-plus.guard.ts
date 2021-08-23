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
import { UserService } from 'src/user/user.service';
import { AllowedRoles } from './role-decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector, private readonly usersService:UserService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<AllowedRoles>('roles', context.getHandler(),);
        console.log(roles);
        
        if(!roles) {
            return true;
        }
        const ctx = GqlExecutionContext.create(context).getContext();
        
        if (!ctx.headers.authorization) {
        return false;
        }
        
        ctx.user = await this.validateToken(ctx.headers.authorization);
        if(roles.includes('Any'))
            return true;
        return roles.includes(ctx.user.role);
    }

    async validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        const token = auth.split(' ')[1];

        try {
            const decoded = jwt.verify(decryptValue(token), process.env.PRIVATE_KEY);
            const { user } = await this.usersService.findById(decoded["id"]);
            return user;
        } catch (err) {
            return true;
            // const message = 'Token error: ' + (err.message || err.name);
            // throw new HttpException(message, HttpStatus.UNAUTHORIZED);
        }
    }
}