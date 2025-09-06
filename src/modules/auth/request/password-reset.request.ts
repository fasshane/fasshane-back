import { IsEmail } from 'class-validator';
import { IsNotEmptyString } from 'src/common/decorator';

export class PasswordResetDto {
  @IsEmail()
  email: string;
}

export class VerifyPasswordResetCodeDto {
  @IsEmail()
  email: string;

  @IsNotEmptyString()
  code: string;
}

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsNotEmptyString()
  newPassword: string;
}
