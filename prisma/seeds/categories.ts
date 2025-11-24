import { type MealCategory, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createCategories(): Promise<
  Record<string, MealCategory>
> {
  const categoriesData = [
    { name: 'Закуски', slug: 'appetizers' },
    { name: 'Сніданок', slug: 'breakfast' },
    { name: 'Основні страви', slug: 'main-courses' },
    { name: 'Десерти', slug: 'desserts' },
    { name: 'Напої', slug: 'drinks' },
    { name: 'Вегетаріанська', slug: 'vegetarian' },
  ];

  const subCategoriesData = [
    { name: 'Салати', slug: 'salads', parentSlug: 'appetizers' },
    { name: 'Супи', slug: 'soups', parentSlug: 'appetizers' },
    { name: 'Паста', slug: 'pasta', parentSlug: 'main-courses' },
    { name: 'Стейки', slug: 'steaks', parentSlug: 'main-courses' },
    {
      name: 'Торти та випічка',
      slug: 'cakes-pastries',
      parentSlug: 'desserts',
    },
    { name: 'Морозиво та сорбети', slug: 'ice-cream', parentSlug: 'desserts' },
    { name: 'Коктейлі', slug: 'cocktails', parentSlug: 'drinks' },
    { name: 'Кава та чай', slug: 'coffee-tea', parentSlug: 'drinks' },
  ];

  const created: Record<string, MealCategory> = {};

  try {
    // 1) Top-level categories — upsert (idempotent)
    for (const c of categoriesData) {
      const cat = await prisma.mealCategory.upsert({
        where: { slug: c.slug },
        update: { name: c.name },
        create: { name: c.name, slug: c.slug },
      });
      created[c.slug] = cat;
    }

    // 2) Subcategories — ensure parent exists (either in created map or in DB)
    for (const sc of subCategoriesData) {
      // знайдемо parent id: спочатку з map, інакше з БД
      let parent = created[sc.parentSlug];
      if (!parent) {
        parent =
          (await prisma.mealCategory.findUnique({
            where: { slug: sc.parentSlug },
          })) ?? undefined;
      }

      created[sc.slug] = await prisma.mealCategory.upsert({
        where: { slug: sc.slug },
        update: {
          name: sc.name,
          parentId: parent ? parent.id : null,
        },
        create: {
          name: sc.name,
          slug: sc.slug,
          parentId: parent ? parent.id : undefined,
        },
      });
    }

    console.log(`✅ Categories ensured: ${Object.keys(created).length}`);
    return created;
  } catch (err) {
    console.error('Error creating categories:', err);
    throw err;
  }
}
