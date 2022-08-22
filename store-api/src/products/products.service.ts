import { Injectable } from '@nestjs/common'
import { Product, Prisma } from '@prisma/client'

import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

import { PrismaService } from '../infra/prisma.service'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    await this.prisma.product.create({
      data: { ...createProductDto }
    })
  }

  async findAll(skip: number, take: number) {
    const products = await this.prisma.product.findMany({
      skip,
      take
    })

    return products
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id }
    })

    if (!product) {
      throw new Prisma.NotFoundError('Product not found!')
    }

    return product
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id }
    })

    if (!product) {
      throw new Prisma.NotFoundError('Product not found!')
    }

    await this.prisma.product.update({
      where: { id },
      data: { ...updateProductDto }
    })
  }

  async remove(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id }
    })

    if (!product) {
      throw new Prisma.NotFoundError('Product not found!')
    }

    await this.prisma.product.delete({
      where: { id }
    })
  }
}
