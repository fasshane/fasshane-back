import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getRandomBool = () => Math.random() < 0.5;

export const createSuppliers = async () => {
  const suppliersData = [
    {
      name: 'Свіжі Органічні Ферми',
      email: 'contact@freshorganicfarms.com',
      phone: '555-111-2222',
    },
    {
      name: 'Міські Зелені Продукти',
      email: 'info@urbangreengrocers.com',
      phone: '555-333-4444',
    },
    {
      name: 'Земні Овочі Ко.',
      email: 'hello@earthlyproduce.com',
      phone: '555-555-6666',
    },
    {
      name: 'Суто Свіже',
      email: 'service@purelyfresh.com',
      phone: '555-777-8888',
    },
    {
      name: 'Щедрість Природи',
      email: 'contact@naturesbounty.com',
      phone: '555-999-0000',
    },
    {
      name: 'Ферми Зеленої Долини',
      email: 'info@greenvalleyfarms.com',
      phone: '555-321-4321',
    },
    {
      name: 'Органічний Урожай',
      email: 'support@organicharvest.com',
      phone: '555-654-7654',
    },
    {
      name: 'Сонячні Лани',
      email: 'contact@sunnyacresproduce.com',
      phone: '555-234-3456',
    },
    {
      name: 'Постачальник Трав’яного Саду',
      email: 'info@herbgardensupply.com',
      phone: '555-567-6789',
    },
    {
      name: 'Фермерський Ринок',
      email: 'hello@farmfreshmarket.com',
      phone: '555-876-9876',
    },
  ];

  return await Promise.all(
    suppliersData.map((supplier) =>
      prisma.supplier.create({
        data: {
          ...supplier,
          active: getRandomBool(),
        },
      }),
    ),
  );
};
