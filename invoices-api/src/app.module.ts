import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { InvoicesModule } from './invoices/invoices.module'

@Module({
  imports: [ConfigModule.forRoot(), InvoicesModule],
  controllers: [],
  providers: []
})
export class AppModule {}
