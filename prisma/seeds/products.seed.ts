import { PrismaClient, ProductType } from '@prisma/client';
import { getRandomFloat, getRandomInt } from '../../src/common/function';

const prisma = new PrismaClient();

export const createProducts = async (suppliers) => {
  const productsData = [
    { name: 'вівсяні пластівці', type: ProductType.WEIGHT },
    { name: 'молоко', type: ProductType.WEIGHT },
    { name: 'банан', type: ProductType.WEIGHT },
    { name: 'яблуко', type: ProductType.WEIGHT },
    { name: 'ягоди', type: ProductType.WEIGHT },
    { name: 'мед', type: ProductType.WEIGHT },
    { name: 'горіхи', type: ProductType.WEIGHT },
    { name: 'какао', type: ProductType.WEIGHT },
    { name: 'чорний шоколад', type: ProductType.WEIGHT },
    { name: 'грецький йогурт', type: ProductType.WEIGHT },
    { name: 'гранола', type: ProductType.WEIGHT },
    { name: 'насіння чіа', type: ProductType.WEIGHT },
    { name: 'манго', type: ProductType.WEIGHT },
    { name: 'ананас', type: ProductType.WEIGHT },
    { name: 'кокосова стружка', type: ProductType.WEIGHT },
    { name: 'гречка', type: ProductType.WEIGHT },
    { name: 'вершкове масло', type: ProductType.WEIGHT },
    { name: 'цукор', type: ProductType.WEIGHT },
    { name: 'кукурудзяна крупа', type: ProductType.WEIGHT },
    { name: 'вермішель', type: ProductType.WEIGHT },
    { name: 'рис', type: ProductType.WEIGHT },
    { name: 'пшоно', type: ProductType.WEIGHT },
    { name: 'авокадо', type: ProductType.WEIGHT },
    { name: 'яйце', type: ProductType.WEIGHT },
    { name: 'кіноа', type: ProductType.WEIGHT },
    { name: 'томати чері', type: ProductType.WEIGHT },
    { name: 'зелень', type: ProductType.WEIGHT },
    { name: 'оливкова олія', type: ProductType.WEIGHT },
    { name: 'овочева суміш', type: ProductType.WEIGHT },
    { name: 'шпинат', type: ProductType.WEIGHT },
    { name: 'булгур', type: ProductType.WEIGHT },
    { name: 'творог', type: ProductType.WEIGHT },
    { name: 'огірок', type: ProductType.WEIGHT },
    { name: 'помідор', type: ProductType.WEIGHT },
    { name: 'гриби', type: ProductType.WEIGHT },
    { name: 'овочі', type: ProductType.WEIGHT },
    { name: 'соєвий соус', type: ProductType.WEIGHT },
    { name: 'зелена цибуля', type: ProductType.WEIGHT },
    { name: 'спагеті', type: ProductType.WEIGHT },
    { name: 'панчетта', type: ProductType.WEIGHT },
    { name: 'пармезан', type: ProductType.WEIGHT },
    { name: 'чорний перець', type: ProductType.WEIGHT },
    { name: 'куряче філе', type: ProductType.WEIGHT },
    { name: 'томатний соус', type: ProductType.WEIGHT },
    { name: 'вершки', type: ProductType.WEIGHT },
    { name: 'цибуля', type: ProductType.WEIGHT },
    { name: 'часник', type: ProductType.WEIGHT },
    { name: 'імбир', type: ProductType.WEIGHT },
    { name: 'рис для суші', type: ProductType.WEIGHT },
    { name: 'лосось', type: ProductType.WEIGHT },
    { name: 'тунець', type: ProductType.WEIGHT },
    { name: 'норі', type: ProductType.WEIGHT },
    { name: 'імбир маринований', type: ProductType.WEIGHT },
    { name: 'яловичина', type: ProductType.WEIGHT },
    { name: 'червоне вино', type: ProductType.WEIGHT },
    { name: 'морква', type: ProductType.WEIGHT },
    { name: 'бульйон', type: ProductType.WEIGHT },
    { name: 'томати', type: ProductType.WEIGHT },
    { name: 'болгарський перець', type: ProductType.WEIGHT },
    { name: 'свинина', type: ProductType.WEIGHT },
    { name: 'кінза', type: ProductType.WEIGHT },
    { name: 'тортильї пшеничні', type: ProductType.WEIGHT },
    { name: 'лайм', type: ProductType.WEIGHT },
    { name: 'рисова локшина', type: ProductType.WEIGHT },
    { name: 'креветки', type: ProductType.WEIGHT },
    { name: 'тофу', type: ProductType.WEIGHT },
    { name: 'арахіс', type: ProductType.WEIGHT },
    { name: 'паростки квасолі', type: ProductType.WEIGHT },
    { name: 'нут', type: ProductType.WEIGHT },
    { name: 'піта', type: ProductType.WEIGHT },
    { name: 'хумус', type: ProductType.WEIGHT },
    { name: 'тахіні', type: ProductType.WEIGHT },
    { name: 'листя салату', type: ProductType.WEIGHT },
    { name: 'проростки', type: ProductType.WEIGHT },
    { name: 'соус кочуджан', type: ProductType.WEIGHT },
    { name: 'баклажан', type: ProductType.WEIGHT },
    { name: 'картопля', type: ProductType.WEIGHT },
    { name: 'фарш', type: ProductType.WEIGHT },
    { name: 'борошно', type: ProductType.WEIGHT },
    { name: 'сир', type: ProductType.WEIGHT },
    { name: 'пшенична локшина', type: ProductType.WEIGHT },
    { name: 'м’ясо', type: ProductType.WEIGHT },
  ];

  const tasks = [];

  productsData.forEach((product, index) => {
    const supplier = suppliers[index % suppliers.length];

    const quantity = getRandomInt(1, 100);
    const priceForOne = parseFloat(getRandomFloat(0.5, 10).toFixed(2));
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
