import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { FPGrowthService } from './fpgrowth.service';

// @UseGuards(JwtAuthGuard)
@Controller('fpgrowth')
export class FPGrowthController {
  constructor(readonly fpgrowthService: FPGrowthService) {}

  @Get()
  async getMe(@Req() req) {
    return this.fpgrowthService.calculateRules();
  }

}
