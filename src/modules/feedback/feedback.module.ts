import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';

@Module({
  controllers: [FeedbackController],
  providers: [PrismaService, FeedbackService],
  exports: [FeedbackService],
})
export class FeedbackModule {}
