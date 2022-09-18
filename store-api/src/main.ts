import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'

import { AppModule } from './app.module'

import { EntityNotFoundExceptionFilter } from './infra/exception-filters/entity-not-found.exception-filter'
import { RpcExceptionFilter } from './infra/exception-filters/rpc.exception-filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.useGlobalFilters(
    new EntityNotFoundExceptionFilter(),
    new RpcExceptionFilter()
  )
  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 422 }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  await app.listen(process.env.PORT ?? 3333)
}

bootstrap()
