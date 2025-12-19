import { type MealCategory, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createCategories(): Promise<Record<string, MealCategory>> {
  const categoriesData = [
    { name: 'Сніданки– FassCorner', slug: 'breakfast-fasscorner' },
  ];

  const subCategoriesData = [
    {
      name: 'Вівсяні Каші (Porridge)',
      slug: 'porridge',
      parentSlug: 'breakfast-fasscorner',
    },
    {
      name: 'Йогуртові Боули',
      slug: 'yogurt-bowls',
      parentSlug: 'breakfast-fasscorner',
    },
    {
      name: 'Українські Молочні Каші',
      slug: 'ukrainian-milk-porridges',
      parentSlug: 'breakfast-fasscorner',
    },
    {
      name: 'Солоні Боули',
      slug: 'savory-bowls',
      parentSlug: 'breakfast-fasscorner',
    },
  ];

  const created: Record<string, MealCategory> = {};

  try {
    for (const c of categoriesData) {
      const cat = await prisma.mealCategory.upsert({
        where: { slug: c.slug },
        update: { name: c.name },
        create: { name: c.name, slug: c.slug },
      });
      created[c.slug] = cat;
    }

    for (const sc of subCategoriesData) {
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
