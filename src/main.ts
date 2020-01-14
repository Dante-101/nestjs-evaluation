import './log'

import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { AllExceptionFilter } from './framework/exception-filter/all-exception-filter'

async function bootstrap() {
  console.log('Bootstrapping app...')
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new AllExceptionFilter())
  // Starts listening to shutdown hooks
  app.enableShutdownHooks()
  await app.listen(3000)
}
bootstrap()
