import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import {
  ApiCreate,
  ApiDelete,
  ApiFindAll,
  ApiFindOne,
  ApiInternalErrorResponse,
  ApiUpdate,
} from './decorators';
import { ProductCode } from './enums';
import { ApiConsumes, ApiProduces, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './guards/auth.guard';
import { MetricsService } from 'src/metrics/metrics.service';

@ApiInternalErrorResponse()
@ApiTags('Product')
@ApiConsumes('application/json')
@ApiProduces('application/json')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly metricService: MetricsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiCreate()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    this.metricService.incrementRequestCounter();
    return this.productService.create(createProductDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiFindAll()
  findAll(@Query('isActive') isActive?: string): Promise<Product[]> {
    this.metricService.incrementRequestCounter();
    return this.productService.findAll(isActive);
  }

  @Get(':code')
  @UseGuards(AuthGuard)
  @ApiFindOne()
  findOne(
    @Param('code') code: ProductCode,
    @Query('isActive') isActive?: string,
  ): Promise<Product> {
    this.metricService.incrementRequestCounter();
    return this.productService.findOne(code, isActive);
  }

  @Put(':code')
  @UseGuards(AuthGuard)
  @ApiUpdate()
  update(
    @Param('code') code: ProductCode,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    this.metricService.incrementRequestCounter();
    return this.productService.update(code, updateProductDto);
  }

  @Delete(':code')
  @UseGuards(AuthGuard)
  @ApiDelete()
  remove(@Param('code') code: ProductCode): Promise<Product> {
    this.metricService.incrementRequestCounter();
    return this.productService.remove(code);
  }
}
