import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { LocationService } from './location.service';
import { UpsertLocationDto } from './dto/request';
import { StaffOnly } from '../../common/decorator';

@Controller('location')
export class LocationController {
  constructor(readonly service: LocationService) {}

  @Get()
  async getAllLocations() {
    return this.service.getAllLocations();
  }

  @Get(':slug')
  async getLocationBySlug(@Param('slug') slug: string) {
    return this.service.getLocationBySlug(slug);
  }

  @StaffOnly()
  @Patch('/:id')
  upsert(@Param('id') id: string, @Body() dto: UpsertLocationDto) {
    return this.service.upsertBySlug(id, dto);
  }

  @StaffOnly()
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.deleteById(id);
  }
}
