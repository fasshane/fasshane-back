import { Injectable } from '@nestjs/common';
import { LocationRepository } from './location.repository';

@Injectable()
export class LocationService {
  constructor(readonly locationRepository: LocationRepository) {}

  async getAllLocations() {
    return await this.locationRepository.getAllLocations();
  }

}
