import { Controller, Get, Post, Body } from '@nestjs/common'

import { InvoicesService } from './invoices.service'
import { CreateInvoiceDto } from './dto/create-invoice.dto'

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto)
  }

  @Get()
  findAll() {
    return this.invoicesService.findAll()
  }
}
