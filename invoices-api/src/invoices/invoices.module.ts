import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'

import { PrismaModule } from 'src/infra/prisma.module'
import { InvoicesService } from './invoices.service'
import { IssueCardService } from './issue_card/issue_card.service'
import { InvoicesController } from './invoices.controller'
import { CreditCardsService } from './credit-cards.service'
import { CreditCardsController } from './credit-cards.controller'

@Module({
  imports: [
    PrismaModule,
    ClientsModule.registerAsync([
      {
        name: 'CREDIT_CARD_PACKAGE',
        useFactory: () => ({
          transport: Transport.GRPC,
          options: {
            url: process.env.GRPC_HOST,
            package: 'credit_card',
            protoPath: join(__dirname, 'proto/credit_card.proto')
          }
        })
      }
    ])
  ],
  controllers: [InvoicesController, CreditCardsController],
  providers: [InvoicesService, CreditCardsService, IssueCardService]
})
export class InvoicesModule {}
