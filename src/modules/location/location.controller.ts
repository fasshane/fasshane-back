import {
  Controller,
  Get,
  Req,
} from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(readonly locationService: LocationService) {}

  @Get()
  async getAllLocations(@Req() req) {
    return this.locationService.getAllLocations();
  }
}
