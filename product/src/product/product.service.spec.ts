import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Country, ProductCode } from './enums';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<Product>;
  const PRODUCT_REPOSITORY_TOKEN = getRepositoryToken(Product);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PRODUCT_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn((entity) => entity),
            save: jest.fn((entity) => entity),
            findOne: jest.fn((entity) => entity),
            find: jest.fn((entity) => [entity]),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(
      PRODUCT_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(productRepository).toBeDefined();
  });

  describe('create', () => {
    it('should return a product', async () => {
      const product = {
        name: 'product',
        description: 'description',
        price: 100,
        code: ProductCode.P001,
        countries: [Country.COLOMBIA],
        fromAge: 18,
        minRevenue: 1000,
        isActive: true,
      };
      const result = await service.create(product);
      expect(result).toEqual(product);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = await service.findAll();
      expect(result).toEqual([
        {
          where: {
            isActive: true,
          },
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const result = await service.findOne(ProductCode.P001);
      expect(result).toEqual({
        where: {
          code: 'P001',
          isActive: true,
        },
      });
    });
  });

  describe('update', () => {
    it('should return a product', async () => {
      const product = {
        name: 'product',
        description: 'description',
        price: 100,
        code: ProductCode.P001,
        countries: [Country.COLOMBIA],
        fromAge: 18,
        minRevenue: 1000,
        isActive: true,
      };
      const result = await service.update(ProductCode.P001, product);
      expect(result).toEqual({
        code: 'P001',
        countries: ['CO'],
        description: 'description',
        fromAge: 18,
        isActive: true,
        minRevenue: 1000,
        name: 'product',
        price: 100,
        where: {
          code: 'P001',
          isActive: true,
        },
      });
    });
  });

  describe('remove', () => {
    it('should return a product', async () => {
      const result = await service.remove(ProductCode.P001);
      expect(result).toEqual({
        isActive: false,
        where: {
          code: 'P001',
          isActive: true,
        },
      });
    });
  });
});
