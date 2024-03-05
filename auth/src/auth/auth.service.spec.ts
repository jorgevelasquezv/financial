import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ValidRoles } from './interfaces';
import * as bcrypt from 'bcrypt';
import { PassportModule } from '@nestjs/passport';

jest.mock('bcrypt', () => ({
  compareSync: jest.fn(),
  hashSync: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      providers: [
        AuthService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn((entity) => entity),
            save: jest.fn((entity) => entity),
            findOne: jest.fn((entity) => entity),
            find: jest.fn((entity) => [entity]),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockImplementation(() => 'token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    it('should return a user', async () => {
      const user = {
        password: 'password',
        email: 'email@mail.com',
        fullName: 'fullName',
        role: ValidRoles.admin,
      };
      (bcrypt.hashSync as jest.Mock).mockReturnValue(true);
      const result = await service.create(user);
      delete user.password;
      expect(result).toEqual({ ...user, token: 'token' });
    });
  });

  describe('login', () => {
    it('should return a user', async () => {
      const user = {
        username: 'username',
        password: 'password',
        email: 'email@mail.com',
      };
      (bcrypt.compareSync as jest.Mock).mockReturnValue(true);
      const result = await service.login(user);
      expect(result).toEqual({
        select: ['email', 'password', 'fullName', 'id'],
        token: 'token',
        where: {
          email: 'email@mail.com',
        },
      });
    });
  });

  describe('renewToken', () => {
    it('should return a user', async () => {
      const user = {
        id: '1',
        email: 'email@mail.com',
        isActive: true,
        fullName: 'fullName',
        roles: ['admin'],
        checkFieldsBeforeInsert: jest.fn(),
        password: 'password',
      };
      const result = await service.renewToken(user);
      expect(result).toEqual({ ...user, token: 'token' });
    });
  });
});
