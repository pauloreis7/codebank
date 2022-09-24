import { Injectable, HttpException } from '@nestjs/common'
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

    if (
      createOrderDto.credit_card.expiration_year <= new Date().getFullYear() &&
      createOrderDto.credit_card.expiration_month < new Date().getMonth() + 1
    ) {
      throw new HttpException('Invalid credit card expiration month', 422)
    }

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

    const { orderId, paymentResponse } = await this.prisma.$transaction(
      async prisma => {
        const paymentResponse = await this.paymentService.payment({
          creditCard: {
            name: order.credit_card_name,
            number: order.credit_card_number,
            expirationMonth: order.credit_card_expiration_month,
            expirationYear: order.credit_card_expiration_year,
            cvv: order.credit_card_cvv
          },
          amount: order.total,
          description: `Produtos: ${products.map(p => p.name).join(', ')}`,
          store: process.env.STORE_NAME
        })

        const orderStatus =
          paymentResponse.status === 'approved'
            ? Status.APPROVED
            : Status.REJECTED

        const createdOrder = await prisma.order.create({
          data: {
            total: order.total,
            status: orderStatus,
            credit_card_name: order.credit_card_name,
            credit_card_number: order.credit_card_number,
            credit_card_expiration_month: order.credit_card_expiration_month,
            credit_card_expiration_year: order.credit_card_expiration_year,
            credit_card_cvv: order.credit_card_cvv,
            OrderItems: { createMany: { data: formattedOrderItems } }
          }
        })

        return { orderId: createdOrder.id, paymentResponse }
      }
    )

    if (paymentResponse.status === 'rejected') {
      throw new HttpException('Transaction rejected', 400)
    }

    return { orderId }
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
      where: { id },
      include: { OrderItems: true }
    })

    if (!order) {
      throw new Prisma.NotFoundError('Order not found!')
    }

    order.credit_card_number =
      '************' + order.credit_card_number.substring(12)

    const product = await this.prisma.product.findUnique({
      where: { id: order.OrderItems[0].product_id }
    })

    return { order, product }
  }
}
