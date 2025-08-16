import { IsEmail, IsString, MinLength } from 'class-validator';

export class MfaRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  code: string;
}
