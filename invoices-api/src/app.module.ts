import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { InvoicesModule } from './invoices/invoices.module'

@Module({
  imports: [ConfigModule.forRoot(), InvoicesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
