import { Role } from '@prisma/client';

export class CreateUserModel {
  googleId?: string;
  email: string;
  name: string;
  password?: string;
  role: Role;

  constructor(data: Partial<CreateUserModel>) {
    this.googleId = data.googleId;
    this.email = data.email;
    this.name = data.name || 'Default Name';
    this.role = data.role;
    this.password = data.password;
  }
}
