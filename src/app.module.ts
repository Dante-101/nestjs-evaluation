import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { CatsModule } from './cats/cats.module'
import { CatsController } from './cats/controllers/cats.controller'
import { NON_CLASS_TOKEN } from './const'
import { DogsController } from './dogs/controllers/dogs.controller'
import { DogsModule } from './dogs/dogs.module'
import { LoggerMiddleware } from './framework/middleware/logger.middleware'

@Module({
  imports: [CatsModule, DogsModule.dynamicModule({ field: 'value' })],
  providers: [
    {
      provide: NON_CLASS_TOKEN,
      useValue: { token: 'Did you get this token?' }
    }
  ]
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
