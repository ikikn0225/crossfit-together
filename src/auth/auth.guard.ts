import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { JwtService } from "src/jwt/jwt.service";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { AllowedRoles } from "./role-decorator";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector,
        private readonly jwtService:JwtService,
        private readonly usersService:UserService,) {}
    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<AllowedRoles>('roles', context.getHandler());
        if(!roles) {
            return true;
        }
        const gqlContext = GqlExecutionContext.create(context).getContext();
        console.log(gqlContext.token);
        const user: User = gqlContext['user'];
        console.log(user);
        
        if (roles.includes('Any')) {
            return true;
        }
        return roles.includes(user.role);
    }
}