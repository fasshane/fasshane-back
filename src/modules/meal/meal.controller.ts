import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { MealService } from './meal.service';
import { MealCreateRequestDto } from './dto/meal-create.request.dto';

// @UseGuards(JwtAuthGuard)
@Controller('meal')
export class MealController {

  constructor(readonly mealService: MealService) {
  }

  @Get('/allMeals')
  async getMe(@Req() req) {
    return this.mealService.getAllMeals();
  }

  @Get()
  async getMeal(@Query('id') id: string) {
    return this.mealService.getMealById(id);
  }
  
  @Post('/createMeal')
  async createMeal(@Body() mealCreateDto: MealCreateRequestDto) {
    return this.mealService.createMeal(mealCreateDto);
  }

  @Put('/updatedMeal')
  async updatedMeal(@Query('id') id: string, @Body() mealUpdateDto: MealCreateRequestDto) {
    return this.mealService.updatedMeal(id, mealUpdateDto);
  }

  @Delete(':id')
  async deleteMeal(@Param('id') id: string) {
    return await this.mealService.deleteMeal(id);
  }

}