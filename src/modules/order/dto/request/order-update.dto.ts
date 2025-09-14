import { IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemUpdateDto {
  @IsOptional()
  @IsString()
  itemId?: string;

  @IsOptional()
  @IsString()
  mealId?: string;

  @IsNumber()
  quantity: number;

  @IsIn(['add', 'update', 'delete'])
  action: 'add' | 'update' | 'delete';
}

export class OrderUpdateDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemUpdateDto)
  items: OrderItemUpdateDto[];
}