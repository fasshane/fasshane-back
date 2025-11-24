import { BadRequestException, Injectable } from '@nestjs/common';
import { Location } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UpsertLocationDto } from './dto/request';

@Injectable()
export class LocationRepository {
  constructor(private prisma: PrismaService) {}

  async getAllLocations(): Promise<Location[]> {
    return this.prisma.location.findMany();
  }

  async getLocationBySlug(slug: string): Promise<Location> {
    return this.prisma.location.findUnique({ where: { slug } });
  }

  async updateById(id: string, dto: UpsertLocationDto) {
    if (dto.slug) {
      const exists = await this.prisma.location.findUnique({
        where: { slug: dto.slug },
        select: { id: true },
      });

      if (exists && exists.id !== id) {
        throw new BadRequestException('Slug already used');
      }
    }

    return this.prisma.location.update({
      where: { id },
      data: dto,
    });
  }

  async deleteById(id: string) {
    return this.prisma.location.delete({ where: { id } });
  }
}
