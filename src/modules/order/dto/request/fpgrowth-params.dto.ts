import { IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class FpgrowthParamsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minSupport?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minConfidence?: number;
}
