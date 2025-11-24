import { Injectable, NotFoundException } from '@nestjs/common';
import { LocationRepository } from './location.repository';
import { UpsertLocationDto } from './dto/request';

@Injectable()
export class LocationService {
  constructor(readonly repository: LocationRepository) {}

  async getAllLocations() {
    return this.repository.getAllLocations();
  }

  async getLocationBySlug(slug: string) {
    const row = await this.repository.getLocationBySlug(slug);
    if (!row) throw new NotFoundException('Location not found');
    return row;
  }

  async upsertBySlug(id: string, dto: UpsertLocationDto) {
    return this.repository.updateById(id, dto);
  }

  async deleteById(id: string) {
    return this.repository.deleteById(id);
  }
}
