import { Injectable } from '@nestjs/common';
import { Ingredient, Location, Meal } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { MealCreateRequestDto } from './dto/meal-create.request.dto';

@Injectable()
export class LocationRepository {
  constructor(private prisma: PrismaService) {}

  async getAllLocations(): Promise<Location[]> {
    return this.prisma.location.findMany({
    });
  }
}
