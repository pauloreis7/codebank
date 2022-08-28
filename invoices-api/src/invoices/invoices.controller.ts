import { Controller, Get, ValidationPipe } from '@nestjs/common'
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

  @Get()
  findAll() {
    return this.invoicesService.findAll()
  }
}
