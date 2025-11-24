import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [FeedbackController],
  providers: [PrismaService, FeedbackService],
  exports: [FeedbackService],
})
export class FeedbackModule {}
