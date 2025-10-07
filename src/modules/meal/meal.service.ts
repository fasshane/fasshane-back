import { Injectable } from '@nestjs/common';
import { MealRepository } from './meal.repository';
import { MealResponseDto } from './dto/response/meal.response.dto';
import { MealCreateRequestDto } from './dto/meal-create.request.dto';

@Injectable()
export class MealService {
  constructor(readonly mealRepository: MealRepository) {}

  async getAllMeals() {
    // const meals = await this.mealRepository.getAllMeals();
    // return meals.map((meal) => ({
    //   // TODO: maybe make the mappers
    //   id: meal.id,
    //   name: meal.name,
    //   description: meal.description,
    //   mealProducts: meal.ingredients.map((mp) => mp.product.name),
    //   image: meal.image,
    //   price: meal.price.toNumber(),
    // }));
    return await this.mealRepository.getAllMeals();
  }

  async getMealById(id: string) {
    return await this.mealRepository.getMealById(id);
  }

  async createMeal(mealCreateDto: MealCreateRequestDto) {
    return await this.mealRepository.createMeal(mealCreateDto);
  }

  async updatedMeal(id: string, mealUpdateDto: MealCreateRequestDto) {
    const oldMeal = await this.mealRepository.getMealById(id);
    if (oldMeal == null) return;
    return await this.mealRepository.updatedMeal(
      id,
      mealUpdateDto,
      oldMeal.ingredients,
    );
  }

  async deleteMeal(id: string) {
    return await this.mealRepository.deleteMeal(id);
  }

  async getMealsByLocation(locationSlug: string) {
    return await this.mealRepository.getMealsByLocation(locationSlug);
  }
}
