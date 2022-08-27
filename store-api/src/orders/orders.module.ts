import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'

import { OrdersService } from './orders.service'
import { PaymentService } from './payment/payment.service'
import { OrdersController } from './orders.controller'
import { PrismaModule } from 'src/infra/prisma.module'

@Module({
  imports: [
    PrismaModule,
    ClientsModule.registerAsync([
      {
        name: 'PAYMENT_PACKAGE',
        useFactory: () => ({
          transport: Transport.GRPC,
          options: {
            url: process.env.GRPC_HOST,
            package: 'payment',
            protoPath: join(__dirname, 'proto/payment.proto')
          }
        })
      }
    ])
  ],
  controllers: [OrdersController],
  providers: [OrdersService, PaymentService]
})
export class OrdersModule {}
