import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor() {
        console.log('AllExceptionFilter Initialized')
    }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
        const errorResponse = exception instanceof HttpException ? exception.getResponse() : ''

        let errorObject = {
            path: request.url,
            message: typeof errorResponse === 'string' ? errorResponse : undefined,
            timestamp: new Date().toISOString(),
        }
        if (typeof errorResponse !== 'string') {
            errorObject = { ...errorObject, ...errorResponse }
        }

        response
            .status(status)
            .json(errorObject);
    }
}