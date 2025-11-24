import { PrismaClient } from '@prisma/client';
import { createCategories } from '../seeds/categories';
import { createLocations } from '../seeds/locations.seed';
import { createMeals } from '../seeds/meals.seed';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.locationMeal.deleteMany(),
    prisma.location.deleteMany(),
  ]);
  console.log('Cleared locationMeal + location');

  const categories = await createCategories(); // реалізацію createCategories очікую у тебе

  // 3) Створити локації
  const locations = await createLocations();

  // 4) Створити страви, пов'язати їх з категоріями і локаціями
  await createMeals(categories ?? {}, locations);

  console.log('ALL SEEDS DONE');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
