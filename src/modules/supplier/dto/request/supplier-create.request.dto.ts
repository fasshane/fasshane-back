import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SupplierCreateRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;

  @IsOptional()
  @IsString()
  avatar: string;
}