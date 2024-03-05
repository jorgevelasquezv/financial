import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Country, ProductCode } from './enums';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;
  let productRepository: Repository<Product>;
  const PRODUCT_REPOSITORY_TOKEN = getRepositoryToken(Product);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
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
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockImplementation(() => ({
              pipe: jest.fn(),
            })),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(
      PRODUCT_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
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
      const result = await controller.create(product);
      expect(result).toEqual(product);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = await controller.findAll();
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
      const result = await controller.findOne(ProductCode.P001);
      expect(result).toEqual({ where: { code: 'P001', isActive: true } });
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
      const result = await controller.update(ProductCode.P001, product);
      expect(result).toEqual({
        ...product,
        where: { code: 'P001', isActive: true },
      });
    });
  });

  describe('remove', () => {
    it('should return a product', async () => {
      const result = await controller.remove(ProductCode.P001);
      expect(result).toEqual({
        isActive: false,
        where: { code: 'P001', isActive: true },
      });
    });
  });
});
