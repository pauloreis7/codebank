import { Module } from '@nestjs/common'

import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { PrismaModule } from 'src/infra/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
