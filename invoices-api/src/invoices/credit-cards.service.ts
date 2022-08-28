import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/infra/prisma.service'
import { CreateCreditCardDto } from './dto/create-credit-card.dto'

@Injectable()
export class CreditCardsService {
  constructor(private prisma: PrismaService) {}

  async create(createCreditCardDto: CreateCreditCardDto) {
    await this.prisma.creditCard.create({
      data: createCreditCardDto
    })
  }

  async findAllByCreditCard() {
    return 'This action find all credit cards'
  }
}
