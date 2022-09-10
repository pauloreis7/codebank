import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ProductsModule } from './products/products.module'
import { OrdersModule } from './orders/orders.module'

@Module({
  imports: [ConfigModule.forRoot(), ProductsModule, OrdersModule],
  controllers: [],
  providers: []
})
export class AppModule {}
