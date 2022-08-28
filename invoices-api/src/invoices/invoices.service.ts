import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from 'src/infra/prisma.service'
import { CreateInvoiceDto } from './dto/create-invoice.dto'

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    const creditCard = await this.prisma.creditCard.findUnique({
      where: { number: createInvoiceDto.credit_card_number }
    })

    if (!creditCard) {
      throw new Prisma.NotFoundError('Credit card not found!')
    }

    await this.prisma.invoice.create({
      data: {
        credit_card_id: creditCard.id,
        transaction_id: createInvoiceDto.transaction_id,
        amount: createInvoiceDto.amount,
        description: createInvoiceDto.description,
        payment_date: createInvoiceDto.payment_date,
        store: createInvoiceDto.store
      }
    })
  }

  async findAllByCardNumber(cardNumber: string) {
    const creditCard = await this.prisma.creditCard.findUnique({
      where: { number: cardNumber }
    })

    if (!creditCard) {
      throw new Prisma.NotFoundError('Credit card not found!')
    }

    const invoices = await this.prisma.invoice.findMany({
      where: { credit_card_id: creditCard.id }
    })

    return invoices
  }
}
