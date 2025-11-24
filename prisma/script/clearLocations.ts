import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearAllLocations() {
  try {
    await prisma.$transaction([
      prisma.locationMeal.deleteMany(),
      prisma.location.deleteMany(),
    ]);
    console.log('Очистка: LocationMeal та Location видалені.');
  } catch (err) {
    console.error('Помилка при очищенні location:', err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}
clearAllLocations();
