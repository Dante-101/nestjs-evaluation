import { DynamicModule } from '@nestjs/common'

import { NON_CLASS_TOKEN } from '../const'
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

    static async dynamicModule(options: object): Promise<DynamicModule> {
        console.log('DogModule dynamic module options received ' + JSON.stringify(options))
        return new Promise<DynamicModule>((resolve) => {
            console.log('DogModule dynamic module get started')
            setTimeout(() => {
                console.log('DogModule dynamic module get done')
                resolve({
                    module: DogsModule,
                    providers: [
                        DogsService,
                        {
                            provide: NON_CLASS_TOKEN,
                            useFactory: async () => new Promise<{ token: string }>((res) => {
                                setTimeout(() => res({ token: 'Did you get this token?' }), 1000)
                            })
                        }
                    ],
                    exports: [DogsService],
                    controllers: [DogsController]
                })
            }, 1000)
        })
    }
}
