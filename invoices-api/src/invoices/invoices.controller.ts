import { Controller, Get, Param, ValidationPipe } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { InvoicesService } from './invoices.service'
import { CreateInvoiceDto } from './dto/create-invoice.dto'

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @MessagePattern(process.env.KAFKA_TRANSACTIONS_TOPIC)
  create(
    @Payload(new ValidationPipe())
    message: CreateInvoiceDto
  ) {
    return this.invoicesService.create(message)
  }

  @Get(':card_number')
  findAllByCardNumber(@Param('card_number') cardNumber: string) {
    const invoices = this.invoicesService.findAllByCardNumber(cardNumber)

    return invoices
  }
}
