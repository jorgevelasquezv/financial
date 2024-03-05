import { Injectable } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { SEED_PRODUCTS } from './data/product-data.seed';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Product)
    private readonly productService: ProductService,
    private readonly productRepository: Repository<Product>,
  ) {}

  async runSeed(): Promise<void> {
    await this.deleteTables();
    await this.seedProducts();
  }

  private async deleteTables(): Promise<void> {
    await this.productRepository.delete({});
  }

  private async seedProducts(): Promise<void> {
    const promises = SEED_PRODUCTS.map(async (product) =>
      this.productService.create(product),
    );

    await Promise.all(promises);
  }
}
