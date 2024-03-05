import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';

describe('ClientController', () => {
  let controller: ClientController;
  let clientService: ClientService;
  let clientRepository: Repository<Client>;
  const CLIENT_REPOSITORY_TOKEN = getRepositoryToken(Client);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        ClientService,
        {
          provide: CLIENT_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn((entity) => entity),
            save: jest.fn((entity) => entity),
            findOneBy: jest.fn((entity) => entity),
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

    controller = module.get<ClientController>(ClientController);
    clientService = module.get<ClientService>(ClientService);
    clientRepository = module.get<Repository<Client>>(CLIENT_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(clientService).toBeDefined();
  });

  it('should be defined', () => {
    expect(clientRepository).toBeDefined();
  });

  describe('create', () => {
    it('should return a client', async () => {
      const client = {
        email: 'email@mail.com',
        fullName: 'name',
        lastName: 'lastName',
        age: 30,
        country: 'COLOMBIA',
        revenue: 5000000,
        accessKey: '123456',
        birthday: '1990-01-01',
        isActive: true,
      };
      const result = await controller.create(client);
      delete client.accessKey;

      expect(result).toEqual(client);
    });
  });

  describe('findAll', () => {
    it('should return an array of clients', async () => {
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
    it('should return a client', async () => {
      const result = await controller.findOne('email@mail.com');
      expect(result).toEqual({
        email: 'email@mail.com',
      });
    });
  });

  describe('update', () => {
    it('should return a client', async () => {
      const client = {
        email: 'email@mail.com',
        fullName: 'name',
        lastName: 'lastName',
        age: 30,
        country: 'COLOMBIA',
        revenue: 5000000,
        accessKey: '123456',
        birthday: '1990-01-01',
        isActive: true,
      };
      const result = await controller.update('email@mail.com', client);
      delete client.accessKey;
      expect(result).toEqual(client);
    });
  });
});
