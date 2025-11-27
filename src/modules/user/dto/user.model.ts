import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserModel {
  @IsOptional()
  @IsString()
  googleId?: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  permissions?: string;

  @IsOptional()
  @IsString()
  register?: string | null;

  constructor(data: Partial<CreateUserModel> = {}) {
    this.googleId = data.googleId;
    this.email = data.email;
    this.name = data.name || 'Default Name';
    this.role = data.role;
    this.password = data.password;
    this.department = data.department;
    this.permissions = data.permissions;
    this.register = data.register ?? null;
  }
}
