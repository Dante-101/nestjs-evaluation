import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor() {
        console.log('LoggingInterceptor Initialized')
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest<Request>()
        console.log(`LoggingInterceptor - Before ${req.originalUrl}...`);

        const now = Date.now();
        return next.handle()
            .pipe(tap(() => console.log(`LoggingInterceptor - After ${req.originalUrl}... ${Date.now() - now}ms`)));
    }
}