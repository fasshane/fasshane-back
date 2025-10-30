import { Injectable } from '@nestjs/common';
import { Ingredient, Meal } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CategoryRepository {
  constructor(private prisma: PrismaService) { }

  async getAllCategories() {
    return this.prisma.mealCategory.findMany({
      where: { parentId: null },
      include: {
        children: {
          include: {
            children: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });
  }
}
