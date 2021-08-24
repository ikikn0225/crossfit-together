import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AllowedRoles } from "./role-decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<AllowedRoles>('roles', context.getHandler(),);
        if(!roles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        console.log(user);
        return roles === user.role;
    }
}