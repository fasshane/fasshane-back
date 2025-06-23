import { PrismaClient, ProductType } from '@prisma/client';
import { getRandomFloat, getRandomInt } from '../../src/common/function';

const prisma = new PrismaClient();

export const createProducts = async (suppliers) => {
  const productsData = [
    { name: 'Tomato', type: ProductType.WEIGHT },
    { name: 'Cheese', type: ProductType.WEIGHT },
    { name: 'Bread', type: ProductType.WEIGHT },
    { name: 'Lettuce', type: ProductType.WEIGHT },
    { name: 'Chicken', type: ProductType.WEIGHT },
    { name: 'Milk', type: ProductType.LIQUID },
    { name: 'Olive Oil', type: ProductType.LIQUID },
    { name: 'Eggs', type: ProductType.QUANTITY },
    { name: 'Rice', type: ProductType.WEIGHT },
    { name: 'Yogurt', type: ProductType.LIQUID },
  ];

  const tasks = [];

  productsData.forEach((product, index) => {
    const supplier = suppliers[index % suppliers.length];

    const quantity = getRandomInt(1, 100);
    const priceForOne = parseFloat(getRandomFloat(0.5, 10).toFixed(2));
    console.log('priceForOne', priceForOne);
    const price = parseFloat((priceForOne * quantity).toFixed(2));
    const limit = getRandomInt(50, 1000);

    tasks.push(
      prisma.product.create({
        data: {
          name: product.name,
          type: product.type,
          count: 1,
          supplierProducts: {
            create: {
              supplierId: supplier.id,
              quantity,
              price,
              name: product.name,
              priceForOne,
              limit,
            },
          },
        },
      }),
    );
  });

  return await Promise.all(tasks);
};
