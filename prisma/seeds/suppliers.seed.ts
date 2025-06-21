import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getRandomBool = () => Math.random() < 0.5;

export const createSuppliers = async () => {
  const suppliersData = [
    {
      name: 'Fresh Organic Farms',
      email: 'contact@freshorganicfarms.com',
      phone: '555-111-2222',
    },
    {
      name: 'Urban Green Grocers',
      email: 'info@urbangreengrocers.com',
      phone: '555-333-4444',
    },
    {
      name: 'Earthly Produce Co.',
      email: 'hello@earthlyproduce.com',
      phone: '555-555-6666',
    },
    {
      name: 'Purely Fresh',
      email: 'service@purelyfresh.com',
      phone: '555-777-8888',
    },
    {
      name: 'Nature’s Bounty',
      email: 'contact@naturesbounty.com',
      phone: '555-999-0000',
    },
    {
      name: 'Green Valley Farms',
      email: 'info@greenvalleyfarms.com',
      phone: '555-321-4321',
    },
    {
      name: 'Organic Harvest',
      email: 'support@organicharvest.com',
      phone: '555-654-7654',
    },
    {
      name: 'Sunny Acres Produce',
      email: 'contact@sunnyacresproduce.com',
      phone: '555-234-3456',
    },
    {
      name: 'Herb Garden Supply',
      email: 'info@herbgardensupply.com',
      phone: '555-567-6789',
    },
    {
      name: 'Farm Fresh Market',
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
