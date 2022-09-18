import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  ValidationPipe
} from '@nestjs/common'
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
    return this.creditCardService.create(
      message.credit_card_name,
      message.credit_card_number
    )
  }

  @HttpCode(201)
  @Post()
  async issueCard(@Body() creditCardInfos: { cardName: string }) {
    console.log('recived ===>', creditCardInfos.cardName)

    const response = await this.creditCardService.issueCard(
      creditCardInfos.cardName
    )

    return response
  }

  @Get(':card_number')
  findOne(@Param('card_number') cardNumber: string) {
    const creditCard = this.creditCardService.findByCreditCardNumber(cardNumber)

    return creditCard
  }
}
