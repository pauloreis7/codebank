import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/infra/prisma.service'

@Injectable()
export class CreditCardsService {
  constructor(private prisma: PrismaService) {}

  async create(credit_card_name: string, credit_card_number: string) {
    await this.prisma.creditCard.create({
      data: {
        name: credit_card_name,
        number: credit_card_number
      }
    })
  }

  async findByCreditCardNumber(cardNumber: string) {
    const creditCard = await this.prisma.creditCard.findUnique({
      where: { number: cardNumber }
    })

    return creditCard
  }
}
