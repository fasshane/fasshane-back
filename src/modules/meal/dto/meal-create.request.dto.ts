import { IsNotEmpty, IsString, IsArray, IsNumber } from 'class-validator';

export class MealCreateRequestDto {
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsString()
    description: string;

    @IsString()
    @IsNotEmpty({ message: 'Image is required' })
    image: string;

    @IsArray()
    @IsNotEmpty({ message: 'Ingredients are required' })
    ingredients: IngredientCreateDto[];
}

export class IngredientCreateDto {
    @IsString()
    @IsNotEmpty({ message: 'productId is required' })
    productId: string;

    @IsNumber()
    quantity: number;
}