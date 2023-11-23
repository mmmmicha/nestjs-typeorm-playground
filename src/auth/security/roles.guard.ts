import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }
    // context 를 통해, request 등의 정보들을 가져올 수 있다.
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            return true;
        }
    
        const request = context.switchToHttp().getRequest();
        const user = request.user;
    
        return user && user.roles && user.roles.some((role) => roles.includes(role));
    }
}