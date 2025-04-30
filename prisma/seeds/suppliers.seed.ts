import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createSuppliers = async () => {
  return await Promise.all([
    prisma.supplier.create({
      data: {
        name: 'Fresh Organic Farms',
        email: 'contact@freshorganicfarms.com',
        phone: '555-111-2222',
      },
    }),
    prisma.supplier.create({
      data: {
        name: 'Urban Green Grocers',
        email: 'info@urbangreengrocers.com',
        phone: '555-333-4444',
      },
    }),
    prisma.supplier.create({
      data: {
        name: 'Earthly Produce Co.',
        email: 'hello@earthlyproduce.com',
        phone: '555-555-6666',
      },
    }),
    prisma.supplier.create({
      data: {
        name: 'Purely Fresh',
        email: 'service@purelyfresh.com',
        phone: '555-777-8888',
      },
    }),
    prisma.supplier.create({
      data: {
        name: 'Nature’s Bounty',
        email: 'contact@naturesbounty.com',
        phone: '555-999-0000',
      },
    }),
    prisma.supplier.create({
      data: {
        name: 'Green Valley Farms',
        email: 'info@greenvalleyfarms.com',
        phone: '555-321-4321',
      },
    }),
    prisma.supplier.create({
      data: {
        name: 'Organic Harvest',
        email: 'support@organicharvest.com',
        phone: '555-654-7654',
      },
    }),
    prisma.supplier.create({
      data: {
        name: 'Sunny Acres Produce',
        email: 'contact@sunnyacresproduce.com',
        phone: '555-234-3456',
      },
    }),
    prisma.supplier.create({
      data: {
        name: 'Herb Garden Supply',
        email: 'info@herbgardensupply.com',
        phone: '555-567-6789',
      },
    }),
    prisma.supplier.create({
      data: {
        name: 'Farm Fresh Market',
        email: 'hello@farmfreshmarket.com',
        phone: '555-876-9876',
      },
    }),
  ]);
};
