import { Controller, Get, Param, ValidationPipe } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { InvoicesService } from './invoices.service'
import { KafkaCreateInvoiceDto } from './dto/create-invoice.dto'

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @MessagePattern('payment')
  create(
    @Payload(new ValidationPipe())
    message: KafkaCreateInvoiceDto
  ) {
    return this.invoicesService.create(message.value)
  }

  @Get(':card_number')
  findAllByCardNumber(@Param('card_number') cardNumber: string) {
    const invoices = this.invoicesService.findAllByCardNumber(cardNumber)

    return invoices
  }
}
