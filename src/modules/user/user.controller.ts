import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { CreateUserModel } from './dto/user.model';
import { Roles } from '../../common/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from '../../common/guards/roles.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {

  constructor(readonly userService: UserService) {
  }

  @Get('/me')
  async getMe(@Req() req) {
    return req.user;
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async getUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/create')
  async createUser(@Body() user: CreateUserModel) {
    return this.userService.createUser(user);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('/status/:id')
  async changeStatusUser(@Param('id') id: string) {
    return this.userService.changeStatusUser(id);
  }
}