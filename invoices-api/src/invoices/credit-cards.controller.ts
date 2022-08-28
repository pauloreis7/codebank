import { Controller, Get, Post, Body, Param } from '@nestjs/common'

import { CreditCardsService } from './credit-cards.service'
import { CreateCreditCardDto } from './dto/create-credit-card.dto'

@Controller('credit-cards')
export class CreditCardsController {
  constructor(private readonly creditCardService: CreditCardsService) {}

  @Post()
  create(@Body() createCreditCardDto: CreateCreditCardDto) {
    return this.creditCardService.create(createCreditCardDto)
  }

  @Get(':card_number')
  findOne(@Param('card_number') cardNumber: string) {
    const creditCard = this.creditCardService.findByCreditCardNumber(cardNumber)

    return creditCard
  }
}
