import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { slugify } from 'src/common/function';

const categoryTreeInclude = {
  children: {
    include: {
      children: true,
    },
  },
};

@Injectable()
export class CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async getAllCategories() {
    return this.prisma.mealCategory.findMany({
      where: { parentId: null },
      include: categoryTreeInclude,
      orderBy: { name: 'asc' },
    });
  }

  findById(id: string) {
    return this.prisma.mealCategory.findUnique({ where: { id } });
  }

  async generateUniqueSlug(name: string, excludeId?: string) {
    const base = slugify(name);
    let attempt = base;
    let counter = 1;

    while (true) {
      const existing = await this.prisma.mealCategory.findFirst({
        where: {
          slug: attempt,
          ...(excludeId ? { NOT: { id: excludeId } } : {}),
        },
        select: { id: true },
      });

      if (!existing) {
        return attempt;
      }

      attempt = `${base}-${counter++}`;
    }
  }

  createCategory(data: { name: string; slug: string; parentId?: string | null }) {
    return this.prisma.mealCategory.create({
      data: {
        name: data.name,
        slug: data.slug,
        parentId: data.parentId ?? null,
      },
      include: categoryTreeInclude,
    });
  }

  updateCategory(
    id: string,
    data: { name: string; parentId?: string | null; slug?: string },
  ) {
    return this.prisma.mealCategory.update({
      where: { id },
      data: {
        name: data.name,
        parentId: data.parentId ?? null,
        ...(data.slug ? { slug: data.slug } : {}),
      },
      include: categoryTreeInclude,
    });
  }

  deleteCategory(id: string, fallbackParentId: string | null) {
    return this.prisma.$transaction(async tx => {
      await tx.meal.updateMany({
        where: { categoryId: id },
        data: { categoryId: null },
      });

      await tx.mealCategory.updateMany({
        where: { parentId: id },
        data: { parentId: fallbackParentId },
      });

      return tx.mealCategory.delete({ where: { id } });
    });
  }

  updateCategoryDishes(categoryId: string, dishIds: string[]) {
    const uniqueIds = Array.from(new Set(dishIds));

    return this.prisma.$transaction(async tx => {
      if (uniqueIds.length === 0) {
        await tx.meal.updateMany({
          where: { categoryId },
          data: { categoryId: null },
        });
      } else {
        await tx.meal.updateMany({
          where: {
            categoryId,
            id: { notIn: uniqueIds },
          },
          data: { categoryId: null },
        });
      }

      if (uniqueIds.length > 0) {
        await tx.meal.updateMany({
          where: { id: { in: uniqueIds } },
          data: { categoryId },
        });
      }

      return tx.mealCategory.findUnique({
        where: { id: categoryId },
        include: categoryTreeInclude,
      });
    });
  }
}
