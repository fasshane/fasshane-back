import { PrismaClient } from '@prisma/client';
import { createSuppliers } from './suppliers.seed';
import { createProducts } from './products.seed';
import { createMeals } from './meals.seed';

const prisma = new PrismaClient();

async function main() {
  // Create suppliers
  const suppliers = await createSuppliers();

  // Create products
  const products = await createProducts(suppliers);

  // Create meals
  await createMeals(products);

  console.log('✅ Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
