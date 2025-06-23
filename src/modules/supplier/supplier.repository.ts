import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { SupplierCreateRequestDto, SupplierUpdateRequestDto } from './dto';
import { Prisma } from '@prisma/client';
import { selectFields } from './constans';

@Injectable()
export class SupplierRepository {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.supplier.findMany({
      select: selectFields,
      orderBy: {
        active: 'desc',
      },
    });
  }

  createOne(supplier: SupplierCreateRequestDto) {
    return this.prisma.supplier.create({
      data: supplier,
      select: selectFields,
    });
  }

  findOneWithProducts(id: string) {
    return this.prisma.supplier.findUnique({
      where: { id: id },
      select: {
        ...selectFields,
        products: {
          select: {
            id: true,
            quantity: true,
            price: true,
            product: true,
            limit: true,
            priceForOne: true,
          },
        },
        orders: {
          select: {
            id: true,
            status: true,
            totalPrice: true,
            createAt: true,
            updatedAt: true,
            orderItems: true,
          },
        },
      },
    });
  }

  async updateWithProducts(supplierId: string, dto: SupplierUpdateRequestDto) {
    const { products, ...supplierData } = dto;

    await this.prisma.supplierProducts.deleteMany({
      where: { supplierId },
    });

    const newRecords = products.map((p) => {
      const quantity = new Prisma.Decimal(p.quantity);
      const price = new Prisma.Decimal(p.price);
      const limit = new Prisma.Decimal(p.limit);

      const priceForOne = quantity.gt(0)
        ? price.div(quantity).toDecimalPlaces(2)
        : new Prisma.Decimal(0);

      return {
        supplierId,
        productId: p.product.id,
        price,
        quantity,
        limit,
        name: p.product.name,
        priceForOne,
      };
    });

    await this.prisma.supplierProducts.createMany({
      data: newRecords,
    });

    return this.prisma.supplier.update({
      where: { id: supplierId },
      data: { ...supplierData },
      include: {
        products: { include: { product: true } },
      },
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

  changeStatus(id: string, status: boolean) {
    return this.prisma.supplier.update({
      where: { id: id },
      data: { active: status },
      select: selectFields,
    });
  }
}
