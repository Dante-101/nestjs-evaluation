import { Module, DynamicModule } from '@nestjs/common'

import { DogsController } from './controllers/dogs.controller'
import { DogsService } from './services/dogs.service'

// @Module({
//     providers: [DogsService],
//     controllers: [DogsController],
//     exports: [DogsService]
// })
export class DogsModule {
    constructor() {
        console.log('DogModule Initialized')
    }
    static async forRoot(options: object): Promise<DynamicModule> {
        console.log('Got options ' + JSON.stringify(options, null, 2))
        return {
            module: DogsModule,
            providers: [DogsService],
            exports: [DogsService],
            controllers: [DogsController]
        }
    }
}
