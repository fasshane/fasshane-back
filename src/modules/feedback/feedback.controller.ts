import { Body, Controller, Post, Req } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Request } from 'express';
import { CreateFeedbackDto } from './dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly service: FeedbackService) {}

  @Post()
  async create(@Body() dto: CreateFeedbackDto, @Req() req: Request) {
    await this.service.create(dto, req);
    return {
      success: true,
    };
  }
}
