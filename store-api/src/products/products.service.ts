import { Injectable } from '@nestjs/common'
import { Product } from '@prisma/client'

import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { PrismaService } from '../infra/prisma.service'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product'
  }

  findAll() {
    return `This action returns all products`
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id }
    })

    return product
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  remove(id: string) {
    return `This action removes a #${id} product`
  }
}
