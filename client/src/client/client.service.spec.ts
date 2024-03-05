import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ClientService', () => {
  let service: ClientService;
  let clientRepository: Repository<Client>;
  const CLIENT_REPOSITORY_TOKEN = getRepositoryToken(Client);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: CLIENT_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn((entity) => entity),
            save: jest.fn((entity) => entity),
            findOne: jest.fn((entity) => entity),
            find: jest.fn((entity) => [entity]),
          },
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    clientRepository = module.get<Repository<Client>>(CLIENT_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(clientRepository).toBeDefined();
  });
});
