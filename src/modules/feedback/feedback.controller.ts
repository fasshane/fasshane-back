import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Request } from 'express';
import { CreateFeedbackDto, FeedbackResponseDto } from './dto';
import { StaffOnly } from '../../common/decorator';
import { UpdateFeedbackDto } from './dto/update-status-feedback.dto.request';

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

  @StaffOnly()
  @Get()
  async getAll(): Promise<FeedbackResponseDto[]> {
    return this.service.getAll();
  }

  @StaffOnly()
  @Patch('/status')
  async updateStatus(
    @Body() dto: UpdateFeedbackDto,
  ): Promise<FeedbackResponseDto> {
    return this.service.updateStatus(dto);
  }
}
