import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { LocationRepository } from './location.repository';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';

@Module({
  exports: [LocationRepository, LocationService],
  providers: [LocationRepository, PrismaService, LocationService, JwtService],
  controllers: [LocationController],
})
export class LocationModule {
}
