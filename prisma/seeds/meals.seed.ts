import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type MealSeed = {
  name: string;
  description?: string;
  composition: string;
  image?: string;
  price: number;
  weightMin: number;
  weightMax: number;
  allergens: string[];
  categorySlug: string;
  locationSlugs: string[];
  ingredients: { product: string; quantity: number }[];
};

const defaultImage = 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg';

export const mealsData: MealSeed[] = [
  {
    name: 'Класична Фруктова Вівсянка — Classic Fruit Porridge',
    description:
      'Класична Фруктова Вівсянка — ніжна вівсянка на молоці з бананом і яблуком/грушею, підсолоджена медом.',
    composition: 'вівсянка, молоко, банан, яблуко/груша, мед',
    image: defaultImage,
    price: 145,
    weightMin: 350,
    weightMax: 380,
    allergens: ['глютен', 'молочні продукти', 'мед'],
    categorySlug: 'porridge',
    locationSlugs: ['cafe-center'],
    ingredients: [
      { product: 'Вівсянка', quantity: 80 },
      { product: 'Молоко', quantity: 200 },
      { product: 'Банан', quantity: 60 },
      { product: 'Яблуко', quantity: 50 },
      { product: 'Груша', quantity: 50 },
      { product: 'Мед', quantity: 15 },
    ],
  },
  {
    name: 'Berry Porridge — Вівсянка з Ягідним Міксом',
    description:
      'Berry Porridge — яскрава вівсянка з молоком і лісовими ягодами, підсолоджена медом чи кленовим сиропом.',
    composition: 'вівсянка, молоко, лісові ягоди, мед або кленовий сироп',
    image: defaultImage,
    price: 150,
    weightMin: 350,
    weightMax: 380,
    allergens: ['глютен', 'молочні продукти', 'мед (за наявності)'],
    categorySlug: 'porridge',
    locationSlugs: ['cafe-center'],
    ingredients: [
      { product: 'Вівсянка', quantity: 80 },
      { product: 'Молоко', quantity: 200 },
      { product: 'Лісові ягоди', quantity: 80 },
      { product: 'Мед', quantity: 15 },
      { product: 'Кленовий сироп', quantity: 15 },
    ],
  },
  {
    name: 'Nut & Honey Porridge — Горіхово-Медова Вівсянка',
    description:
      'Nut & Honey Porridge — кремова вівсянка з міксом горіхів і квітковим медом.',
    composition: 'вівсянка, молоко, мікс горіхів, мед',
    image: defaultImage,
    price: 155,
    weightMin: 340,
    weightMax: 360,
    allergens: ['глютен', 'молочні продукти', 'горіхи', 'мед'],
    categorySlug: 'porridge',
    locationSlugs: ['cafe-center', 'roof-restaurant'],
    ingredients: [
      { product: 'Вівсянка', quantity: 80 },
      { product: 'Молоко', quantity: 200 },
      { product: 'Мікс горіхів', quantity: 40 },
      { product: 'Мед', quantity: 15 },
    ],
  },
  {
    name: 'Chocolate Banana Porridge — Шоколадно-Бананова Вівсянка',
    description:
      'Chocolate Banana Porridge — десертна вівсянка з бананом, какао та стружкою темного шоколаду.',
    composition: 'вівсянка, молоко, банан, какао-порошок, темний шоколад',
    image: defaultImage,
    price: 160,
    weightMin: 350,
    weightMax: 380,
    allergens: ['глютен', 'молочні продукти', 'какао', 'шоколад'],
    categorySlug: 'porridge',
    locationSlugs: ['roof-restaurant'],
    ingredients: [
      { product: 'Вівсянка', quantity: 80 },
      { product: 'Молоко', quantity: 200 },
      { product: 'Банан', quantity: 80 },
      { product: 'Какао-порошок', quantity: 10 },
      { product: 'Темний шоколад', quantity: 20 },
    ],
  },
  {
    name: 'Granola & Fruit Yogurt Bowl — Йогурт-Боул з Гранолою та Фруктами',
    description:
      'Granola & Fruit Yogurt Bowl — легкий йогуртовий боул з гранолою, бананом, полуницею/яблуком та медом.',
    composition: 'йогурт, гранола, банан, полуниця/яблуко, мед',
    image: defaultImage,
    price: 165,
    weightMin: 280,
    weightMax: 320,
    allergens: ['молочні продукти', 'глютен', 'горіхи (можливо)', 'мед'],
    categorySlug: 'yogurt-bowls',
    locationSlugs: ['cafe-center'],
    ingredients: [
      { product: 'Йогурт', quantity: 180 },
      { product: 'Гранола', quantity: 60 },
      { product: 'Банан', quantity: 60 },
      { product: 'Полуниця', quantity: 50 },
      { product: 'Яблуко', quantity: 50 },
      { product: 'Мед', quantity: 15 },
    ],
  },
  {
    name: 'Berry Yogurt Bowl — Йогурт-Боул з Ягідним Міксом',
    description:
      'Berry Yogurt Bowl — освіжаючий боул з йогуртом, гранолою та щедрим ягідним міксом, підсолодженим кленовим сиропом.',
    composition: 'йогурт, гранола, лісові ягоди, кленовий сироп',
    image: defaultImage,
    price: 170,
    weightMin: 260,
    weightMax: 300,
    allergens: ['молочні продукти', 'глютен'],
    categorySlug: 'yogurt-bowls',
    locationSlugs: ['cafe-center', 'roof-restaurant'],
    ingredients: [
      { product: 'Йогурт', quantity: 180 },
      { product: 'Гранола', quantity: 60 },
      { product: 'Лісові ягоди', quantity: 80 },
      { product: 'Кленовий сироп', quantity: 15 },
    ],
  },
  {
    name: 'Tropical Yogurt Bowl — Тропічний Йогурт-Боул',
    description:
      'Tropical Yogurt Bowl — літній боул з йогуртом, гранолою, ананасом, манго, ківі та кокосовою стружкою.',
    composition: 'йогурт, гранола, ананас/манго/ківі, кокосова стружка',
    image: defaultImage,
    price: 175,
    weightMin: 260,
    weightMax: 300,
    allergens: ['молочні продукти', 'глютен', 'кокос'],
    categorySlug: 'yogurt-bowls',
    locationSlugs: ['roof-restaurant'],
    ingredients: [
      { product: 'Йогурт', quantity: 180 },
      { product: 'Гранола', quantity: 60 },
      { product: 'Ананас', quantity: 60 },
      { product: 'Манго', quantity: 60 },
      { product: 'Ківі', quantity: 40 },
      { product: 'Кокосова стружка', quantity: 10 },
    ],
  },
  {
    name: 'Nut & Honey Yogurt Bowl — Горіхово-Медовий Йогурт-Боул',
    description:
      'Nut & Honey Yogurt Bowl — вершковий йогурт з гранолою, міксом горіхів і медом для збалансованої солодкості.',
    composition: 'йогурт, гранола, мікс горіхів, мед',
    image: defaultImage,
    price: 180,
    weightMin: 260,
    weightMax: 300,
    allergens: ['молочні продукти', 'глютен', 'горіхи', 'мед'],
    categorySlug: 'yogurt-bowls',
    locationSlugs: ['cafe-center'],
    ingredients: [
      { product: 'Йогурт', quantity: 180 },
      { product: 'Гранола', quantity: 60 },
      { product: 'Мікс горіхів', quantity: 40 },
      { product: 'Мед', quantity: 15 },
    ],
  },
  {
    name: 'Стілка Гречана — Гречана Каша з Молоком',
    description:
      'Стілка Гречана — домашня гречана каша на молоці з вершковим маслом, цукром або медом.',
    composition: 'гречка, молоко, вершкове масло, цукор або мед',
    image: defaultImage,
    price: 185,
    weightMin: 300,
    weightMax: 330,
    allergens: ['молочні продукти'],
    categorySlug: 'ukrainian-milk-porridges',
    locationSlugs: ['cafe-center', 'roof-restaurant'],
    ingredients: [
      { product: 'Гречка', quantity: 90 },
      { product: 'Молоко', quantity: 200 },
      { product: 'Вершкове масло', quantity: 10 },
      { product: 'Цукор', quantity: 10 },
      { product: 'Мед', quantity: 10 },
    ],
  },
  {
    name: 'Рисова Каша — Рисова Каша з Молоком',
    description:
      'Рисова Каша — ніжний рис на молоці з вершковим маслом та ароматом ванільного цукру або кориці.',
    composition: 'рис, молоко, вершкове масло, ванільний цукор/кориця',
    image: defaultImage,
    price: 190,
    weightMin: 290,
    weightMax: 320,
    allergens: ['молочні продукти'],
    categorySlug: 'ukrainian-milk-porridges',
    locationSlugs: ['cafe-center'],
    ingredients: [
      { product: 'Рис', quantity: 90 },
      { product: 'Молоко', quantity: 200 },
      { product: 'Вершкове масло', quantity: 10 },
      { product: 'Ванільний цукор', quantity: 5 },
      { product: 'Кориця', quantity: 2 },
    ],
  },
  {
    name: 'Вермішелєва Каша — Каша з Вермішеллю та Молоком',
    description:
      'Вермішелєва Каша — класична молочна каша з вермішеллю та ніжним вершковим маслом.',
    composition: 'вермішель, молоко, вершкове масло, цукор або мед',
    image: defaultImage,
    price: 195,
    weightMin: 290,
    weightMax: 320,
    allergens: ['молочні продукти', 'глютен'],
    categorySlug: 'ukrainian-milk-porridges',
    locationSlugs: ['cafe-center'],
    ingredients: [
      { product: 'Вермішель', quantity: 90 },
      { product: 'Молоко', quantity: 200 },
      { product: 'Вершкове масло', quantity: 10 },
      { product: 'Цукор', quantity: 10 },
      { product: 'Мед', quantity: 10 },
    ],
  },
  {
    name: 'Mix Bowl — Мікс-Боул',
    description:
      'Mix Bowl — комбінована молочна каша з рису, гречки та вермішелі з родзинками, горіхами і медом.',
    composition: 'рис/гречка/вермішель, молоко, родзинки, горіхи, мед',
    image: defaultImage,
    price: 200,
    weightMin: 300,
    weightMax: 330,
    allergens: ['молочні продукти', 'глютен (за вибором)', 'горіхи', 'мед'],
    categorySlug: 'ukrainian-milk-porridges',
    locationSlugs: ['roof-restaurant'],
    ingredients: [
      { product: 'Рис', quantity: 50 },
      { product: 'Гречка', quantity: 50 },
      { product: 'Вермішель', quantity: 50 },
      { product: 'Молоко', quantity: 200 },
      { product: 'Родзинки', quantity: 20 },
      { product: 'Мікс горіхів', quantity: 30 },
      { product: 'Мед', quantity: 15 },
    ],
  },
  {
    name: 'Avocado & Egg Bowl — Боул з Авокадо та Яйцем',
    description:
      'Avocado & Egg Bowl — ситний боул з гречкою, стиглим авокадо, руколою/шпинатом та вареним яйцем.',
    composition: 'авокадо, варене яйце, гречка, рукола/шпинат, оливкова олія',
    image: defaultImage,
    price: 205,
    weightMin: 260,
    weightMax: 300,
    allergens: ['яйце'],
    categorySlug: 'savory-bowls',
    locationSlugs: ['cafe-center'],
    ingredients: [
      { product: 'Авокадо', quantity: 80 },
      { product: 'Яйце', quantity: 2 },
      { product: 'Гречка', quantity: 100 },
      { product: 'Рукола', quantity: 20 },
      { product: 'Шпинат', quantity: 20 },
      { product: 'Оливкова олія', quantity: 15 },
    ],
  },
  {
    name: 'Veggie Oatmeal Bowl — Овочева Вівсянка',
    description:
      'Veggie Oatmeal Bowl — тепла вівсянка на овочевому бульйоні зі шпинатом, грибами й яйцем.',
    composition: 'вівсянка, овочевий бульйон, шпинат, гриби, яйце, оливкова олія',
    image: defaultImage,
    price: 210,
    weightMin: 300,
    weightMax: 330,
    allergens: ['глютен', 'яйце'],
    categorySlug: 'savory-bowls',
    locationSlugs: ['roof-restaurant'],
    ingredients: [
      { product: 'Вівсянка', quantity: 90 },
      { product: 'Овочевий бульйон', quantity: 200 },
      { product: 'Шпинат', quantity: 40 },
      { product: 'Гриби', quantity: 60 },
      { product: 'Яйце', quantity: 1 },
      { product: 'Оливкова олія', quantity: 15 },
    ],
  },
  {
    name: 'Bulgur & Tvorog Bowl — Булгур-Боул з Творогом',
    description:
      'Bulgur & Tvorog Bowl — теплий булгур із свіжими овочами, творогом та оливково-лимонним соусом.',
    composition: 'булгур, помідор, огірок, творог, оливково-лимонний соус',
    image: defaultImage,
    price: 215,
    weightMin: 290,
    weightMax: 320,
    allergens: ['молочні продукти', 'глютен'],
    categorySlug: 'savory-bowls',
    locationSlugs: ['cafe-center', 'roof-restaurant'],
    ingredients: [
      { product: 'Булгур', quantity: 100 },
      { product: 'Помідор', quantity: 60 },
      { product: 'Огірок', quantity: 60 },
      { product: 'Творог', quantity: 80 },
      { product: 'Оливково-лимонний соус', quantity: 20 },
    ],
  },
  {
    name: 'Savory Rice Bowl — Солоний Рис-Боул',
    description:
      'Savory Rice Bowl — рисовий боул з яйцем, кукурудзою, зеленим горошком, зеленню та легкою олійною заправкою.',
    composition:
      'рис, варене яйце, кукурудза, зелений горошок, зелень, оливкова олія/масло',
    image: defaultImage,
    price: 220,
    weightMin: 300,
    weightMax: 330,
    allergens: ['яйце', 'молочні продукти (якщо є масло)'],
    categorySlug: 'savory-bowls',
    locationSlugs: ['cafe-center'],
    ingredients: [
      { product: 'Рис', quantity: 120 },
      { product: 'Яйце', quantity: 1 },
      { product: 'Кукурудза', quantity: 60 },
      { product: 'Зелений горошок', quantity: 50 },
      { product: 'Зелень', quantity: 20 },
      { product: 'Оливкова олія', quantity: 15 },
      { product: 'Масло', quantity: 10 },
    ],
  },
];

const toDecimal = (value?: number | null) =>
  value != null ? new Prisma.Decimal(String(value)) : null;

export async function createMeals(
  categories: Record<string, any>,
  locations: Record<string, any>,
) {
  try {
    for (const meal of mealsData) {
      const category = categories[meal.categorySlug];
      if (!category) {
        console.error(`Missing category ${meal.categorySlug} for meal "${meal.name}"`);
        continue;
      }

      const existing = await prisma.meal.findFirst({
        where: { name: meal.name },
      });

      const baseData = {
        description: meal.description ?? meal.composition,
        image: meal.image ?? defaultImage,
        price: new Prisma.Decimal(String(meal.price)),
        weightMin: toDecimal(meal.weightMin),
        weightMax: toDecimal(meal.weightMax),
        weight: toDecimal((meal.weightMin + meal.weightMax) / 2),
        allergens: meal.allergens,
        categoryId: category.id,
      };

      const createdOrUpdated = existing
        ? await prisma.meal.update({
            where: { id: existing.id },
            data: baseData,
          })
        : await prisma.meal.create({
            data: {
              name: meal.name,
              ...baseData,
            },
          });

      for (const locationSlug of meal.locationSlugs) {
        const location = locations[locationSlug];
        if (!location) {
          console.error(
            `Missing location ${locationSlug} for meal "${meal.name}"`,
          );
          continue;
        }

        const lm = await prisma.locationMeal.findFirst({
          where: { locationId: location.id, mealId: createdOrUpdated.id },
        });

        if (lm) {
          await prisma.locationMeal.update({
            where: { id: lm.id },
            data: {
              price: new Prisma.Decimal(String(meal.price)),
              available: true,
              stock: lm.stock ?? 10,
            },
          });
        } else {
          await prisma.locationMeal.create({
            data: {
              locationId: location.id,
              mealId: createdOrUpdated.id,
              price: new Prisma.Decimal(String(meal.price)),
              available: true,
              stock: 15,
            },
          });
        }
      }
    }

    console.log('✅ Meals seeded/updated');
  } catch (err) {
    console.error('Error during seed meals:', err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}
