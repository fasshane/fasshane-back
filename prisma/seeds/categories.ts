import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createCategories() {
  const categoriesData = [
    { name: "Закуски", slug: "appetizers" },
    { name: "Сніданок", slug: "breakfast" },
    { name: "Основні страви", slug: "main-courses" },
    { name: "Десерти", slug: "desserts" },
    { name: "Напої", slug: "drinks" },
    { name: "Вегетаріанська", slug: "vegetarian" },
  ];

  const subCategoriesData = [
    { name: "Салати", slug: "salads", parentSlug: "appetizers" },
    { name: "Супи", slug: "soups", parentSlug: "appetizers" },
    { name: "Паста", slug: "pasta", parentSlug: "main-courses" },
    { name: "Стейки", slug: "steaks", parentSlug: "main-courses" },
    { name: "Торти та випічка", slug: "cakes-pastries", parentSlug: "desserts" },
    { name: "Морозиво та сорбети", slug: "ice-cream", parentSlug: "desserts" },
    { name: "Коктейлі", slug: "cocktails", parentSlug: "drinks" },
    { name: "Кава та чай", slug: "coffee-tea", parentSlug: "drinks" },
  ];

  const createdCategories: Record<string, any> = {};

  for (const category of categoriesData) {
    const created = await prisma.mealCategory.create({
      data: { name: category.name, slug: category.slug },
    });
    createdCategories[category.slug] = created;
  }

  for (const subCategory of subCategoriesData) {
    const parent = createdCategories[subCategory.parentSlug];
    if (parent) {
      const created = await prisma.mealCategory.create({
        data: {
          name: subCategory.name,
          slug: subCategory.slug,
          parentId: parent.id,
        },
      });
      createdCategories[subCategory.slug] = created;
    }
  }

  return createdCategories;
}