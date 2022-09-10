import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/infra/prisma.service'
import { IssueCardService } from 'src/invoices/issue_card/issue_card.service'

@Injectable()
export class CreditCardsService {
  constructor(
    private prisma: PrismaService,
    private issueCardService: IssueCardService
  ) {}

  async create(credit_card_name: string, credit_card_number: string) {
    await this.prisma.creditCard.create({
      data: {
        name: credit_card_name,
        number: credit_card_number
      }
    })
  }

  async issueCard(cardName: string) {
    const grpcResponse = await this.issueCardService.issueCard({
      name: cardName.toUpperCase()
    })

    return grpcResponse
  }

  async findByCreditCardNumber(cardNumber: string) {
    const creditCard = await this.prisma.creditCard.findUnique({
      where: { number: cardNumber }
    })

    return creditCard
  }
}
