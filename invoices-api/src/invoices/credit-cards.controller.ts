import { Controller, Get, Post, Body } from '@nestjs/common'

import { CreditCardsService } from './credit-cards.service'
import { CreateCreditCardDto } from './dto/create-credit-card.dto'

@Controller('credit-cards')
export class CreditCardsController {
  constructor(private readonly creditCardService: CreditCardsService) {}

  @Post()
  create(@Body() createCreditCardDto: CreateCreditCardDto) {
    return this.creditCardService.create(createCreditCardDto)
  }

  @Get()
  findAll() {
    return this.creditCardService.findAll()
  }
}
