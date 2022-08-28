import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/infra/prisma.service'
import { CreateCreditCardDto } from './dto/create-credit-card.dto'

@Injectable()
export class CreditCardsService {
  constructor(private prisma: PrismaService) {}

  create(createCreditCardDto: CreateCreditCardDto) {
    console.log(createCreditCardDto)

    return 'This action adds a new credit card'
  }

  findAll() {
    return 'This action find all credit cards'
  }
}
