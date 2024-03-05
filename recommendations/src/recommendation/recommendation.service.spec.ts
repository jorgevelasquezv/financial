import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationService } from './recommendation.service';
import { ClientRequestDto } from './dto';
import { Client, Product } from './entities';
import { Repository } from 'typeorm';
import { Country, ProductCode } from './enums';
import { HttpService } from '@nestjs/axios';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockRepository = jest.fn(() => ({
  findOneBy: jest.fn((entity) => entity),
  find: jest.fn(([entity]) => [entity]),
}));

describe('RecommendationService', () => {
  let service: RecommendationService;
  let clientRepository: Repository<Client>;
  const CLIENT_REPOSITORY_TOKEN = getRepositoryToken(Client);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecommendationService,
        {
          provide: CLIENT_REPOSITORY_TOKEN,
          useValue: mockRepository,
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

    service = module.get<RecommendationService>(RecommendationService);
    clientRepository = module.get<Repository<Client>>(CLIENT_REPOSITORY_TOKEN);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(clientRepository).toBeDefined();
  });

  describe('findProductsInLineWithClientProfile', () => {
    it('should return an array of products', async () => {
      const clientRequest: ClientRequestDto = {
        email: 'pmarmol@mail.com',
        age: 30,
        country: Country.COLOMBIA,
        revenue: 5000000,
      };

      const expectedProducts: Product[] = [
        {
          id: '26af92c1-8330-4f9e-9a50-f488af442e33',
          code: ProductCode.P001,
          description: 'Cuentas de ahorros',
          countries: [Country.COLOMBIA],
          fromAge: 18,
          minRevenue: 0,
          isActive: true,
        },
        {
          id: '8b0894c2-e46b-4b9b-9cbc-c09de9ac5d5d',
          code: ProductCode.P004,
          description: 'Seguro',
          countries: [],
          fromAge: 15,
          minRevenue: 800000,
          isActive: true,
        },
        {
          id: 'b6033ec3-c260-42ad-acc4-bc4a12eba326',
          code: ProductCode.P005,
          description: 'Inversiones',
          countries: [],
          fromAge: 25,
          minRevenue: 4500000,
          isActive: true,
        },
      ];

      jest
        .spyOn(service, 'findProductsInLineWithClientProfile')
        .mockResolvedValue(expectedProducts);
      const result = await service.findProductsInLineWithClientProfile(
        clientRequest,
        'token',
      );

      expect(result).toEqual(expectedProducts);
    });
  });

  describe('findCustomersWithProductsAdjustedToServiceConditions', () => {
    it('should return an array of clients', async () => {
      const productCode = ProductCode.P001;

      const expectedClients: Client[] = [
        {
          id: '345f0bb4-2b0c-465f-afab-84d91f796a73',
          email: 'pmarmol@mail.com',
          fullName: 'Pablo Marmol',
          birthday: '2010-02-24',
          revenue: 5000000,
          city: 'Cali',
          country: 'CO',
          isActive: true,
          accessKey: 'Abc123456',
          age: 11,
        },
      ];

      jest
        .spyOn(service, 'findCustomersWithProductsAdjustedToServiceConditions')
        .mockResolvedValue(expectedClients);

      const result =
        await service.findCustomersWithProductsAdjustedToServiceConditions(
          productCode,
          'token',
        );

      expect(result).toEqual(expectedClients);
    });
  });
});
