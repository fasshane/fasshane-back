import { PrismaClient, ProductType } from '@prisma/client';
import { getRandomFloat, getRandomInt } from '../../src/common/function';

const prisma = new PrismaClient();

export const createProducts = async (suppliers) => {
  const productsData = [
    { name: 'Помідори', type: ProductType.WEIGHT },
    { name: 'Сир', type: ProductType.WEIGHT },
    { name: 'Хліб', type: ProductType.WEIGHT },
    { name: 'Салат', type: ProductType.WEIGHT },
    { name: 'Курятина', type: ProductType.WEIGHT },
    { name: 'Молоко', type: ProductType.LIQUID },
    { name: 'Оливкова олія', type: ProductType.LIQUID },
    { name: 'Яйця', type: ProductType.QUANTITY },
    { name: 'Рис', type: ProductType.WEIGHT },
    { name: 'Йогурт', type: ProductType.LIQUID },
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
