import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { CatsController } from './cats/controllers/cats.controller'
import { CatsModule } from './cats/cats.module'
import { DogsController } from './dogs/controllers/dogs.controller'
import { DogsModule } from './dogs/dogs.module'
import { LoggerMiddleware } from './middleware/logger.middleware'

@Module({
  imports: [CatsModule, DogsModule.dynamicModule({ field: 'value' })]
})
export class AppModule implements NestModule {
  constructor() {
    console.log('AppModule Initialized')
  }
  configure(consumer: MiddlewareConsumer) {
    console.log('AppModule.configure executed')
    consumer.apply(LoggerMiddleware).forRoutes(CatsController, DogsController)
  }
}
