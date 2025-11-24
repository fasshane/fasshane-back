import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { CreateUserModel } from '../user/dto/user.model';
import { Role, User } from '@prisma/client';
import {
  MfaRequestDto,
  PasswordResetDto,
  ResetPasswordDto,
  SignupRequestDto,
  VerifyPasswordResetCodeDto,
} from './request';
import * as bcrypt from 'bcryptjs';
import { UserResponseDto } from '../user/dto/response/user.response.dto';
import { randomUUID } from 'crypto';
import { PrismaService } from 'nestjs-prisma';
import { MailService } from '../../shared';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private prisma: PrismaService,
    private mail: MailService,
  ) {}

  async oAuthLogin(userData) {
    if (!userData) {
      throw new BadRequestException('Дані користувача не надано!');
    }

    let user: UserResponseDto = await this.userRepository.findUserByEmail(
      userData.email,
    );

    if (!user) {
      user = await this.userRepository.createUser(
        new CreateUserModel({
          googleId: userData.providerId,
          email: userData.email,
          name: userData.name.replace('undefined', '').trim(),
          role: Role.CUSTOMER,
        }),
      );
    }

    const jwt = this.getJwtByUser(user);

    return { jwt, user };
  }

  async signup(signupDto: SignupRequestDto): Promise<void> {
    const { email, password } = signupDto;

    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('Користувач вже існує');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.createUser(
      new CreateUserModel({
        email: email,
        role: Role.CUSTOMER,
        password: hashedPassword,
      }),
    );
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await this.prisma.emailActivationToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    await this.mail.sendEmailActivationToken({ token, email });
  }

  async login(email: string, password: string) {
    const user: User = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Невірні облікові дані');
    }

    if (user.status === 'BLOCKED') {
      throw new BadRequestException('Користувач заблокований');
    }

    if (!user.isVerified) {
      throw new BadRequestException('Користувач не підтвердив email');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Невірні облікові дані');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await this.prisma.mfaCode.create({
      data: {
        userId: user.id,
        code,
        expiresAt,
      },
    });
    await this.mail.sendMfaCode({ code, email });
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    const record = await this.prisma.emailActivationToken.findUnique({
      where: { token },
    });

    if (!record || record.expiresAt < new Date()) {
      throw new BadRequestException('Невірний або прострочений токен');
    }

    await this.prisma.user.update({
      where: { id: record.userId },
      data: { isVerified: true },
    });

    await this.prisma.emailActivationToken.delete({
      where: { id: record.id },
    });

    return { message: 'Email успішно підтверджено' };
  }

  async verifyMfaCode({
    email,
    code,
  }: MfaRequestDto): Promise<{ token: string }> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('Невірні облікові дані');
    }

    const record = await this.prisma.mfaCode.findFirst({
      where: {
        userId: user.id,
        code,
        expiresAt: { gt: new Date() },
      },
    });

    if (!record)
      throw new BadRequestException('Невірний або непідтверджений користувач');

    await this.prisma.mfaCode.delete({
      where: { id: record.id },
    });

    const jwt = this.getJwtByUser(user);
    return { token: jwt };
  }

  async passwordReset({ email }: PasswordResetDto) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user || !user.isVerified) {
      throw new BadRequestException('Невірний або прострочений код');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    await this.prisma.passwordResetCode.create({
      data: { userId: user.id, code, expiresAt },
    });

    await this.mail.sendPasswordResetCode({ email, code });
  }

  async verifyPasswordResetCode({ email, code }: VerifyPasswordResetCodeDto) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) throw new BadRequestException('Невірний користувач');

    const record = await this.prisma.passwordResetCode.findFirst({
      where: {
        userId: user.id,
        code,
        expiresAt: { gt: new Date() },
      },
    });

    if (!record) throw new BadRequestException('Невірний або прострочений код');
  }

  async resetPassword({ email, newPassword }: ResetPasswordDto) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('Користувача не знайдено');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.updateUserPassword(user.id, hashedPassword);

    await this.prisma.passwordResetCode.deleteMany({
      where: { userId: user.id },
    });
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
