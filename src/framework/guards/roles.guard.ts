import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { Observable } from 'rxjs'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
        console.log('RolesGuard Initialized')
     }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        if (!roles) {
            return true
        }
        // const request = context.switchToHttp().getRequest<Request>() as any
        // const user = request.user;
        // const hasRole = () => user.roles.some((role) => roles.includes(role));
        // return user && user.roles && hasRole()
        return roles.includes('admin')
    }
}