import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserResponseDto } from './dto/response/user.response.dto';
import { CreateUserModel } from './dto/user.model';
import * as bcrypt from 'bcryptjs';
import { UserStatus } from '@prisma/client';


@Injectable()
export class UserService {
  constructor(readonly userRepository: UserRepository) {
  }

  getAllUsers(): Promise<UserResponseDto[]> {
    return this.userRepository.findAllUsers();
  }

  async createUser(user: CreateUserModel) {
    const existingUser = await this.userRepository.findUserByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.userRepository.createUser({
      ...user,
      password: hashedPassword,
    });
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return this.userRepository.deleteUserById(id);
  }

  async changeStatusUser(id: string) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const status: UserStatus = user.status === UserStatus.ACTIVE
      ? UserStatus.BLOCKED
      : UserStatus.ACTIVE;
    return this.userRepository.changeStatusUserById(id, status);
  }
}