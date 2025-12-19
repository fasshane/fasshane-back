import { PrismaClient } from '@prisma/client';
import { createSuppliers } from './suppliers.seed';
import { createProducts } from './products.seed';
import { createMeals } from './meals.seed';
import { createCategories } from './categories';
import { createLocations } from './locations.seed';
import { createIngredients } from './ingredients.seed';

const prisma = new PrismaClient();

async function main() {
  // // Create suppliers
  // const suppliers = await createSuppliers();
  //
  // // Create products
  // await createProducts(suppliers);

  const categories = await createCategories();

  const locations = await createLocations();

  // Create meals
  await createMeals(categories, locations);

  // Create ingredients
  await createIngredients();

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
