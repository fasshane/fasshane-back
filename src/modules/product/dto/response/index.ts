import { Prisma, ProductType } from '@prisma/client';

export type ProductShort = {
  id: string;
  name: string;
  type: ProductType;
};

export type Product = ProductShort & {
  count: Prisma.Decimal;
  _count: {
    supplierProducts: number;
    mealProducts: number;
  };
  createAt: Date;
  updatedAt: Date;
  image: string;
};
