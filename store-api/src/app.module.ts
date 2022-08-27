import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductsModule } from './products/products.module'
import { OrdersModule } from './orders/orders.module'

@Module({
  imports: [ConfigModule.forRoot(), ProductsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
