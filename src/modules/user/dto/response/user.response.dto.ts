import { UserStatus } from '@prisma/client';

export type UserResponseDto = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
};
