import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { CreateUserModel } from '../user/dto/user.model';
import { Role } from '@prisma/client';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { UserResponseDto } from '../user/dto/response/user.response.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userRepository: UserRepository) {
  }

  // TODO: add type to userData
  async oAuthLogin(userData) {
    if (!userData) {
      throw new Error('User data not provided!');
    }

    let user: UserResponseDto = await this.userRepository.findUserByEmail(userData.email);

    if (!user) {
      user = await this.userRepository.createUser(new CreateUserModel({
        googleId: userData.providerId,
        email: userData.email,
        name: userData.name.replace('undefined', '').trim(),
        role: Role.CUSTOMER,
      }));
    }

    const jwt = this.getJwtByUser(user);

    return { jwt, user };
  }

  async signup(signupDto: SignupDto): Promise<{ jwt: string }> {
    const { email, password } = signupDto;

    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.createUser(new CreateUserModel({
      name: 'user name',
      email: email,
      role: Role.CUSTOMER,
      password: hashedPassword,
    }));

    const jwt = this.getJwtByUser(user);
    return { jwt };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const jwt = this.getJwtByUser(user);
    return { jwt };
  }


  private getJwtByUser(user: UserResponseDto) {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      status: user.status,
    });
  }
}
