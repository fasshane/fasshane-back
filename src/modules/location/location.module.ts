import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { LocationRepository } from './location.repository';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  exports: [LocationRepository, LocationService],
  providers: [LocationRepository, PrismaService, LocationService],
  controllers: [LocationController],
})
export class LocationModule {}
