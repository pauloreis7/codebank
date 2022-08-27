import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode
} from '@nestjs/common'

import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @HttpCode(201)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto)
  }

  @Get()
  findAll(@Query('skip') skip = '0', @Query('take') take = '100') {
    return this.ordersService.findAll(Number(skip), Number(take))
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const order = this.ordersService.findById(id)

    return order
  }
}
