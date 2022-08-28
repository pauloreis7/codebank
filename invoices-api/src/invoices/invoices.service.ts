import { Injectable } from '@nestjs/common'

import { CreateInvoiceDto } from './dto/create-invoice.dto'
import { UpdateInvoiceDto } from './dto/update-invoice.dto'

@Injectable()
export class InvoicesService {
  create(createInvoiceDto: CreateInvoiceDto) {
    console.log(createInvoiceDto)
    return 'This action adds a new invoice'
  }

  findAll() {
    return `This action returns all invoices`
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    console.log(updateInvoiceDto)
    return `This action updates a #${id} invoice`
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`
  }
}
