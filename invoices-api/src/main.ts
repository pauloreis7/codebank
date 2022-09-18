import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'

import { AppModule } from './app.module'
import { EntityNotFoundExceptionFilter } from './infra/exception-filters/entity-not-found.exception-filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.useGlobalFilters(new EntityNotFoundExceptionFilter())
  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 422 }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  // app.connectMicroservice({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       clientId: process.env.KAFKA_CLIENT_ID,
  //       brokers: [process.env.KAFKA_HOST],
  //       ssl: process.env.KAFKA_USE_SSL === 'true',
  //       ...(process.env.KAFKA_SASL_USERNAME &&
  //         process.env.KAFKA_SASL_USERNAME !== '' &&
  //         process.env.KAFKA_SASL_PASSWORD &&
  //         process.env.KAFKA_SASL_PASSWORD !== '' && {
  //           sasl: {
  //             mechanism: 'plain',
  //             username: process.env.KAFKA_SASL_USERNAME,
  //             password: process.env.KAFKA_SASL_PASSWORD
  //           }
  //         })
  //     },
  //     consumer: {
  //       groupId:
  //         !process.env.KAFKA_CONSUMER_GROUP_ID ||
  //         process.env.KAFKA_CONSUMER_GROUP_ID === ''
  //           ? 'my-consumer-' + Math.random()
  //           : process.env.KAFKA_CONSUMER_GROUP_ID
  //     }
  //   }
  // })

  await app.startAllMicroservices()

  await app.listen(process.env.PORT ?? 8081)
}

bootstrap()
