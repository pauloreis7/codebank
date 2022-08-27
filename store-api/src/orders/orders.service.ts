import { Injectable } from '@nestjs/common'
import { Prisma, Status } from '@prisma/client'

import { CreateOrderDto } from './dto/create-order.dto'

import { PrismaService } from '../infra/prisma.service'
import { PaymentService } from './payment/payment.service'

type FormattedItemProps = {
  quantity: number
  product_id: string
  order_id: string
  price: number
}

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private paymentService: PaymentService
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const orderItemsProductsIds = createOrderDto.items.map(
      item => item.product_id
    )

    const products = await this.prisma.product.findMany({
      where: {
        id: { in: orderItemsProductsIds }
      }
    })

    if (orderItemsProductsIds.length !== products.length) {
      throw new Prisma.NotFoundError('Product not found in list!')
    }

    const order = {
      total: 0,
      status: Status.PENDING,
      credit_card_number: createOrderDto.credit_card.number,
      credit_card_name: createOrderDto.credit_card.name,
      credit_card_cvv: createOrderDto.credit_card.cvv,
      credit_card_expiration_month: createOrderDto.credit_card.expiration_month,
      credit_card_expiration_year: createOrderDto.credit_card.expiration_year
    }

    const formattedOrderItems = createOrderDto.items.map(
      (item: FormattedItemProps) => {
        const product = products.find(product => product.id === item.product_id)

        item.price = Number(product.price)

        return item
      }
    )

    const orderTotal = formattedOrderItems.reduce((sum, item) => {
      return sum + item.quantity * item.price
    }, 0)

    order.total = orderTotal

    await this.prisma.$transaction(async prisma => {
      const createdOrder = await prisma.order.create({
        data: {
          ...order,
          OrderItems: { createMany: { data: formattedOrderItems } }
        }
      })

      await this.paymentService.payment({
        creditCard: {
          name: createdOrder.credit_card_name,
          number: createdOrder.credit_card_number,
          expirationMonth: createdOrder.credit_card_expiration_month,
          expirationYear: createdOrder.credit_card_expiration_year,
          cvv: createdOrder.credit_card_cvv
        },
        amount: order.total,
        description: `Produtos: ${products.map(p => p.name).join(', ')}`,
        store: process.env.STORE_NAME
      })

      await prisma.order.update({
        where: { id: createdOrder.id },
        data: { status: Status.APPROVED }
      })
    })
  }

  async findAll(skip: number, take: number) {
    const orders = await this.prisma.order.findMany({
      skip,
      take,
      include: { OrderItems: true }
    })

    return orders
  }

  async findById(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id }
    })

    if (!order) {
      throw new Prisma.NotFoundError('Order not found!')
    }

    return order
  }
}
