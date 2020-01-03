import { Module } from '@nestjs/common'

import { CatsController } from './controllers/cats.controller'
import { CatsService } from './services/cats.service'

@Module({
    controllers: [CatsController],
    providers: [{
        provide: CatsService,
        useClass: CatsService
    }],
    exports: [CatsService]
})
export class CatsModule {
    constructor(private readonly catsService: CatsService) {
        console.log('CatModule Initialized')
    }
}