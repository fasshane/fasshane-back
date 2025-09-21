import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ContactDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  phoneE164: string;

  @IsOptional()
  @IsString()
  phoneRegion?: string;
}

export class CreateFeedbackDto {
  @IsInt()
  @Min(1)
  @Max(5)
  ratingFood: number;

  @IsInt()
  @Min(1)
  @Max(5)
  ratingService: number;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  comment?: string;

  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;

  @IsString()
  visitorId: string;

  @IsString()
  deviceHash: string;
}
