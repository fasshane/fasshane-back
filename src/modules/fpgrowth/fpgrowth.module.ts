import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { FPGrowthRepository } from './fpgrowth.repository';
import { FPGrowthController } from './fpgrowth.controller';
import { FPGrowthService } from './fpgrowth.service';

@Module({
  providers: [FPGrowthRepository, PrismaService, FPGrowthService, JwtService],
  controllers: [FPGrowthController],
})
export class FPGrowthModule {
}
