import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { ProductService } from './product.service';
import { FileUploadInterceptor, Roles } from 'src/common/decorator';
import { Role } from '@prisma/client';
import {
  ProductCreateRequestDto,
  ProductUpdateRequestDto,
} from './dto/request';
import { Express } from 'express';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.MANAGER)
@Controller('products')
export class ProductController {
  constructor(readonly service: ProductService) {}

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
  @FileUploadInterceptor()
  async create(
    @Body() body: ProductCreateRequestDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.createOne(body, file);
  }

  @Patch('/:id')
  @FileUploadInterceptor()
  updateOne(
    @Param('id') id: string,
    @Body() product: ProductUpdateRequestDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.updateOne(id, product, file);
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }
}
