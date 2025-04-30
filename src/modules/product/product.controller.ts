import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ProductService } from './product.service';
import { Roles } from 'src/common/decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ProductCreateRequestDto } from './dto/request';
import { ProductUpdateRequestDto } from './dto/request/product-update.request.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.MANAGER)
@Controller('products')
export class ProductController {

  constructor(readonly service: ProductService) {
  }

  @Get('/all-select')
  getAllShort() {
    return this.service.findAllShort();
  }

  @Get('')
  getAll() {
    return this.service.findAll();
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string) {
    return this.service.deleteOne(id);
  }

  @Post('')
  create(@Body() product: ProductCreateRequestDto) {
    console.log('product', product);
    return this.service.createOne(product);
  }

  @Patch('/:id')
  updateOne(@Param('id') id: string, @Body() product: ProductUpdateRequestDto) {
    return this.service.updateOne(id, product);
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }
}