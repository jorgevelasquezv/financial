import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCode } from './enums';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.repository.create({
      ...createProductDto,
      isActive: true,
    });
    return await this.repository.save(product);
  }

  async findAll(isActive: string = 'true'): Promise<Product[]> {
    const isActiveBoolean = isActive === 'true';
    return await this.repository.find({ where: { isActive: isActiveBoolean } });
  }

  async findOne(
    code: ProductCode,
    isActive: string = 'true',
  ): Promise<Product> {
    const isActiveBoolean = isActive === 'true';
    const product = await this.repository.findOne({
      where: { code, isActive: isActiveBoolean },
    });
    if (!product)
      throw new NotFoundException(
        `Product with code ${code} not found in products ${isActiveBoolean ? 'active' : 'inactive'}`,
      );
    return product;
  }

  async update(code: ProductCode, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(code);
    return await this.repository.save({ ...product, ...updateProductDto });
  }

  async remove(code: ProductCode) {
    const product = await this.findOne(code);
    return await this.repository.save({ ...product, isActive: false });
  }
}
