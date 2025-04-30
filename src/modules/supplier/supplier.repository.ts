import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { SupplierCreateRequestDto, SupplierUpdateRequestDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SupplierRepository {
  constructor(private prisma: PrismaService) {
  }

  findAll() {
    return this.prisma.supplier.findMany({
      select: selectFields,
    });
  }


  createOne(supplier: SupplierCreateRequestDto) {
    return this.prisma.supplier.create({
      data: supplier,
      select: selectFields,
    });
  }

  findOne(id: string) {
    return this.prisma.supplier.findUnique({
      where: { id: id },
      select: selectFields,
    });
  }

  findOneWithProducts(id: string) {
    return this.prisma.supplier.findUnique({
      where: { id: id },
      select: {
        ...selectFields,
        products:
          {
            select:
              {
                id: true,
                quantity: true,
                price: true,
                product: true,
              },
          },
      },
    });
  }

  async updateWithProducts(
    supplierId: string,
    dto: SupplierUpdateRequestDto,
  ) {
    const { products, ...supplierData } = dto;
    const incomingIds = products.map(p => p.product.id);

    const upserts = products.map(p => ({
      where: {
        supplierId_productId: { supplierId, productId: p.product.id },
      },
      update: {
        price: new Prisma.Decimal(p.price),
        quantity: new Prisma.Decimal(p.quantity),
      },
      create: {
        product: { connect: { id: p.product.id } },
        price: new Prisma.Decimal(p.price),
        quantity: new Prisma.Decimal(p.quantity),
      },
    }));

    return this.prisma.supplier.update({
      where: { id: supplierId },
      data: {
        ...supplierData,
        products: {
          deleteMany: {
            supplierId,
            productId: { notIn: incomingIds },
          },
          upsert: upserts,
        },
      },
      include: {
        products: { include: { product: true } },
      },
    });
  }

  updateOne(id: string, supplier: SupplierUpdateRequestDto) {
    const { products, ...updatedSupplier } = supplier;
    return this.prisma.supplier.update({
      where: { id: id },
      data: updatedSupplier,
      select: selectFields,
    });
  }

  deleteOne(id: string) {
    return this.prisma.supplier.delete({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });
  }
}

const selectFields = {
  id: true,
  name: true,
  email: true,
  rating: true,
  phone: true,
  avatar: true,
  createAt: true,
  updatedAt: true,
  _count: {
    select: {
      products: true,
      orders: true,
    },
  },
};