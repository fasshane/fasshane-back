import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
import { Product, ProductShort } from './dto/response';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      select: selectFields,
      orderBy: { name: 'asc' },
    });
  }

  findAllShort(): Promise<ProductShort[]> {
    return this.prisma.product.findMany({
      select: shortSelectFields,
      orderBy: { name: 'asc' },
    });
  }

  createOne(product: Prisma.ProductCreateInput): Promise<ProductShort> {
    return this.prisma.product.create({
      data: product,
      select: shortSelectFields,
    });
  }

  deleteOne(id: string): Promise<ProductShort> {
    return this.prisma.product.delete({
      where: { id },
      select: shortSelectFields,
    });
  }

  updateOne(
    id: string,
    product: Prisma.ProductUpdateInput,
  ): Promise<ProductShort> {
    return this.prisma.product.update({
      where: { id },
      data: product,
      select: shortSelectFields,
    });
  }

  findOne(id: string): Promise<Product> {
    return this.prisma.product.findUnique({
      where: { id },
      select: selectFields,
    });
  }
}

const shortSelectFields = {
  id: true,
  name: true,
  type: true,
};

const selectFields = {
  id: true,
  name: true,
  count: true,
  type: true,
  image: true,
  _count: {
    select: {
      supplierProducts: true,
      mealProducts: true,
    },
  },
  createAt: true,
  updatedAt: true,
};
