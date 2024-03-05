import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Product } from './entities/product.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [ConfigModule, HttpModule, TypeOrmModule.forFeature([Product])],
  exports: [ProductService, TypeOrmModule],
})
export class ProductModule {}
