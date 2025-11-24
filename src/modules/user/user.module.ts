import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PrismaService } from 'nestjs-prisma';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  exports: [UserRepository, UserService],
  providers: [UserRepository, PrismaService, UserService],
  controllers: [UserController],
})
export class UserModule {}
