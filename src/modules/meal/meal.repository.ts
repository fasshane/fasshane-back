import { Injectable } from '@nestjs/common';
import { Ingredient, Meal } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { MealCreateRequestDto } from './dto/meal-create.request.dto';

@Injectable()
export class MealRepository {
  constructor(private prisma: PrismaService) {
  }

  async getAllMeals(): Promise<(Meal & {
    ingredients: { product: { name: string; id: string; } }[];
  })[]> {
    return await this.prisma.meal.findMany({
      include: {
        ingredients: {
          select: { product: true },
        },
      },
    });
  }

  async getMealById(id: string): Promise<Meal & { ingredients: Ingredient[] }> {
    return await this.prisma.meal.findUnique({
      where: { id },
      include: { ingredients: true },
    });
  }

  async createMeal(mealCreateDto: MealCreateRequestDto) {
    return await this.prisma.meal.create({
      data: {
        name: mealCreateDto.name,
        description: mealCreateDto.description,
        image: mealCreateDto.image,
        ingredients: {
          create: mealCreateDto.ingredients.map((ingredient) => ({
            productId: ingredient.productId,
            quantity: ingredient.quantity,
          })),
        },
      },
    });
  }

  async updatedMeal(id: string, mealUpdateDto: MealCreateRequestDto, previousIngredients: Ingredient[]) {
    const newIngredients = mealUpdateDto.ingredients;

    const newProductIds = newIngredients.map((ingredient) => ingredient.productId);

    const ingredientsToDelete = previousIngredients.filter(
      (ingredient) => !newProductIds.includes(ingredient.productId)
    );

    const ingredientsToCreate = newIngredients.filter(
      (newIngredient) => !previousIngredients.some(
        (oldIngredient) => oldIngredient.productId === newIngredient.productId
      )
    );

    const ingredientsToUpdate = newIngredients.filter((newIngredient) =>
      previousIngredients.some(
        (oldIngredient) => oldIngredient.productId === newIngredient.productId
      )
    );

    return await this.prisma.$transaction([
      this.prisma.ingredient.deleteMany({
        where: {
          id: {
            in: ingredientsToDelete.map((ingredient) => ingredient.id),
          },
        },
      }),

      this.prisma.meal.update({
        where: { id },
        data: {
          name: mealUpdateDto.name,
          description: mealUpdateDto.description,
          image: mealUpdateDto.image,
          ingredients: {
            create: ingredientsToCreate.map((ingredient) => ({
              productId: ingredient.productId,
              quantity: ingredient.quantity,
            })),

            update: ingredientsToUpdate.map((ingredient) => ({
              where: {
                id: previousIngredients.find((oldIngredient) => oldIngredient.productId === ingredient.productId)?.id,
              },
              data: {
                quantity: ingredient.quantity,
              },
            })),
          },
        },
      }),
    ]);
  }

  async deleteMeal(id: string) {
    return await this.prisma.$transaction([
      this.prisma.ingredient.deleteMany({
        where: { mealId: id },
      }),

      this.prisma.meal.delete({
        where: { id },
      }),
    ]);
  }
}
