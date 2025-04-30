import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SupplierService } from './supplier.service';
import { Roles } from '../../common/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from '../../common/guards/roles.guard';
import { SupplierCreateRequestDto, SupplierUpdateRequestDto } from './dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.MANAGER)
@Controller('suppliers')
export class SupplierController {

  constructor(readonly service: SupplierService) {
  }

  @Get()
  async getAll() {
    return this.service.getAll();
  }

  @Post('/create')
  async create(@Body() createSupplierDto: SupplierCreateRequestDto) {
    return this.service.create(createSupplierDto);
  }

  @Get('/:id')
  async getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.getOne(id);
  }

  @Patch('/:id')
  async updateOne(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateSupplierDto: SupplierUpdateRequestDto) {
    return this.service.updateOne(id, updateSupplierDto);
  }

  @Delete('/:id')
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.deleteOne(id);
  }
}