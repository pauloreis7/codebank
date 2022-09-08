import { Controller, Get, Param, ValidationPipe } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { CreditCardsService } from './credit-cards.service'
import { CreateCreditCardDto } from './dto/create-credit-card.dto'

@Controller('credit-cards')
export class CreditCardsController {
  constructor(private readonly creditCardService: CreditCardsService) {}

  @MessagePattern(process.env.KAFKA_CREATED_CREDIT_CARDS_TOPIC)
  async create(
    @Payload(new ValidationPipe())
    message: CreateCreditCardDto
  ) {
    await this.creditCardService.create(
      message.credit_card_name,
      message.credit_card_number
    )

    return message
  }

  @Get(':card_number')
  findOne(@Param('card_number') cardNumber: string) {
    const creditCard = this.creditCardService.findByCreditCardNumber(cardNumber)

    return creditCard
  }
}
