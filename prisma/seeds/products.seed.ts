import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProducts = async (suppliers) => {
  return await Promise.all([
    prisma.product.create({
      data: {
        name: 'Tomato',
        type: 'WEIGHT',
        count: 1,
        supplierProducts: {
          create: {
            supplierId: suppliers[0].id,
            quantity: 1,
            price: 2.5,
          },
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Cheese',
        type: 'WEIGHT',
        count: 1,
        supplierProducts: {
          create: {
            supplierId: suppliers[1].id,
            quantity: 1,
            price: 5.0,
          },
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Bread',
        type: 'WEIGHT',
        count: 1,
        supplierProducts: {
          create: {
            supplierId: suppliers[2].id,
            quantity: 1,
            price: 1.2,
          },
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Lettuce',
        type: 'WEIGHT',
        count: 1,
        supplierProducts: {
          create: {
            supplierId: suppliers[3].id,
            quantity: 1,
            price: 1.5,
          },
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Chicken',
        type: 'WEIGHT',
        count: 1,
        supplierProducts: {
          create: {
            supplierId: suppliers[4].id,
            quantity: 1,
            price: 6.5,
          },
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Milk',
        type: 'LIQUID',
        count: 1,
        supplierProducts: {
          create: {
            supplierId: suppliers[5].id,
            quantity: 1,
            price: 1.8,
          },
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Olive Oil',
        type: 'LIQUID',
        count: 1,
        supplierProducts: {
          create: {
            supplierId: suppliers[6].id,
            quantity: 1,
            price: 7.5,
          },
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Eggs',
        type: 'WEIGHT',
        count: 1,
        supplierProducts: {
          create: {
            supplierId: suppliers[7].id,
            quantity: 1,
            price: 0.3,
          },
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Rice',
        type: 'WEIGHT',
        count: 1,
        supplierProducts: {
          create: {
            supplierId: suppliers[8].id,
            quantity: 1,
            price: 1.1,
          },
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Yogurt',
        type: 'LIQUID',
        count: 1,
        supplierProducts: {
          create: {
            supplierId: suppliers[9].id,
            quantity: 1,
            price: 2.0,
          },
        },
      },
    }),
  ]);
};
