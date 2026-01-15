import { ArrayNotEmpty, IsArray, IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class FpgrowthRequestDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsArray({ each: true })
  transactions: string[][];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minSupport?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minConfidence?: number;
}
