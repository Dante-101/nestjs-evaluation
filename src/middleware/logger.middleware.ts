import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { CatsService } from '../cats/services/cats.service'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly catsService: CatsService) {
        console.log('LoggerMiddleware initialized with catsService having ' + catsService.findAll().length + ' cats')
    }

    use(req: Request, res: Response, next: NextFunction) {
        console.log('Requesting ' + req.originalUrl)
        next()
    }
}
