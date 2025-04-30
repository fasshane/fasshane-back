import { Role } from '@prisma/client';

/**
 * @deprecated
 * need to create new model with validation pipe
 * docs: https://docs.nestjs.com/techniques/validation
 */
export class CreateUserModel {
  googleId?: string;
  email: string;
  name: string;
  password?: string;
  role: Role;

  constructor(data: { googleId?: string, email: string, name: string, role: Role, password?: string }) {
    this.googleId = data.googleId;
    this.email = data.email;
    this.name = data.name;
    this.role = data.role;
    this.password = data.password;
  }
}