import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/infra/prisma.service'
import { CreateInvoiceDto } from './dto/create-invoice.dto'

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  create(createInvoiceDto: CreateInvoiceDto) {
    console.log(createInvoiceDto)

    return 'This action adds a new invoice'
  }

  async findAll() {
    return 'This action find all invoices'
  }
}
