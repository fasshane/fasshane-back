import { Injectable } from '@nestjs/common';
import { Role, User, UserStatus } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserModel } from './dto/user.model';
import { UserResponseDto } from './dto/response/user.response.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) { }

  findUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  createUser(user: CreateUserModel): Promise<UserResponseDto> {
    const roleRelations = this.buildRoleRelation(user);
    return this.prisma.user.create({
      data: {
        googleId: user?.googleId,
        email: user.email,
        name: user.name,
        role: user.role,
        password: user.password,
        ...roleRelations,
      },
      select: selectFields,
    });
  }

  findAllUsers(): Promise<UserResponseDto[]> {
    return this.prisma.user.findMany({
      where: {
        NOT: {
          role: Role.ADMIN,
        },
      },
      select: selectFields,
    });
  }

  findUserById(id: string): Promise<UserResponseDto> {
    return this.prisma.user.findUnique({
      where: { id: id },
      select: selectFields,
    });
  }

  deleteUserById(id: string): Promise<UserResponseDto> {
    return this.prisma.user.delete({
      where: { id: id },
      select: selectFields,
    });
  }

  changeStatusUserById(
    id: string,
    status: UserStatus,
  ): Promise<UserResponseDto> {
    return this.prisma.user.update({
      where: { id: id },
      data: { status: status },
      select: selectFields,
    });
  }

  async updateUserPassword(
    userId: string,
    hashedPassword: string,
  ): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  private buildRoleRelation(user: CreateUserModel) {
    switch (user.role) {
      case Role.MANAGER:
        return {
          manager: {
            create: {
              department: user.department || 'General',
            },
          },
        };
      case Role.ADMIN:
        return {
          admin: {
            create: {
              permissions: user.permissions || 'ALL',
            },
          },
        };
      case Role.CASHIER:
        return {
          cashier: {
            create: {
              register: user.register ?? null,
            },
          },
        };
      default:
        return {
          customer: {
            create: {},
          },
        };
    }
  }
}

const selectFields = {
  id: true,
  email: true,
  name: true,
  role: true,
  status: true,
  avatar: true,
};
