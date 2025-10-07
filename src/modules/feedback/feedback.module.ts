import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [FeedbackController],
  providers: [PrismaService, FeedbackService, JwtService],
  exports: [FeedbackService],
})
export class FeedbackModule {}
