import { Prisma, PrismaClient, ProductType } from '@prisma/client';
import { mealsData } from './meals.seed';

const prisma = new PrismaClient();

const productTypes: Record<string, ProductType> = {
  Вівсянка: ProductType.WEIGHT,
  Молоко: ProductType.LIQUID,
  Банан: ProductType.WEIGHT,
  Яблуко: ProductType.WEIGHT,
  Груша: ProductType.WEIGHT,
  Мед: ProductType.LIQUID,
  'Лісові ягоди': ProductType.WEIGHT,
  'Кленовий сироп': ProductType.LIQUID,
  'Мікс горіхів': ProductType.WEIGHT,
  'Какао-порошок': ProductType.WEIGHT,
  'Темний шоколад': ProductType.WEIGHT,
  Йогурт: ProductType.LIQUID,
  Гранола: ProductType.WEIGHT,
  Полуниця: ProductType.WEIGHT,
  Ананас: ProductType.WEIGHT,
  Манго: ProductType.WEIGHT,
  Ківі: ProductType.WEIGHT,
  'Кокосова стружка': ProductType.WEIGHT,
  Гречка: ProductType.WEIGHT,
  'Вершкове масло': ProductType.WEIGHT,
  Цукор: ProductType.WEIGHT,
  Рис: ProductType.WEIGHT,
  'Ванільний цукор': ProductType.WEIGHT,
  Кориця: ProductType.WEIGHT,
  Вермішель: ProductType.WEIGHT,
  Родзинки: ProductType.WEIGHT,
  Авокадо: ProductType.WEIGHT,
  Яйце: ProductType.QUANTITY,
  Рукола: ProductType.WEIGHT,
  Шпинат: ProductType.WEIGHT,
  'Оливкова олія': ProductType.LIQUID,
  'Овочевий бульйон': ProductType.LIQUID,
  Гриби: ProductType.WEIGHT,
  Булгур: ProductType.WEIGHT,
  Помідор: ProductType.WEIGHT,
  Огірок: ProductType.WEIGHT,
  Творог: ProductType.WEIGHT,
  'Оливково-лимонний соус': ProductType.LIQUID,
  Кукурудза: ProductType.WEIGHT,
  'Зелений горошок': ProductType.WEIGHT,
  Зелень: ProductType.WEIGHT,
  Масло: ProductType.WEIGHT,
};

const toDecimal = (value: number) => new Prisma.Decimal(String(value));

async function ensureProducts() {
  const created: Record<string, { id: string }> = {};

  for (const [name, type] of Object.entries(productTypes)) {
    const existing = await prisma.product.findFirst({ where: { name } });
    if (existing) {
      created[name] = existing;
      continue;
    }

    const product = await prisma.product.create({
      data: {
        name,
        type,
        count: 1,
      },
    });
    created[name] = product;
  }

  return created;
}

export async function createIngredients() {
  try {
    const products = await ensureProducts();

    for (const meal of mealsData) {
      const mealRecord = await prisma.meal.findFirst({ where: { name: meal.name } });
      if (!mealRecord) {
        console.error(`Missing meal for ingredients: ${meal.name}`);
        continue;
      }

      for (const ing of meal.ingredients) {
        const product = products[ing.product];
        if (!product) {
          console.error(`Missing product ${ing.product} for meal ${meal.name}`);
          continue;
        }

        await prisma.ingredient.upsert({
          where: { mealId_productId: { mealId: mealRecord.id, productId: product.id } },
          update: { quantity: toDecimal(ing.quantity) },
          create: {
            mealId: mealRecord.id,
            productId: product.id,
            quantity: toDecimal(ing.quantity),
          },
        });
      }
    }

    console.log('✅ Ingredients seeded/updated');
  } catch (err) {
    console.error('Error during seed ingredients:', err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}
