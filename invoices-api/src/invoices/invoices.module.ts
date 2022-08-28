import { Module } from '@nestjs/common'

import { PrismaModule } from 'src/infra/prisma.module'
import { InvoicesService } from './invoices.service'
import { InvoicesController } from './invoices.controller'
import { CreditCardsService } from './credit-cards.service'
import { CreditCardsController } from './credit-cards.controller'

@Module({
  imports: [PrismaModule],
  controllers: [InvoicesController, CreditCardsController],
  providers: [InvoicesService, CreditCardsService]
})
export class InvoicesModule {}
