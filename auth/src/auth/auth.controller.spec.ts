import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PassportModule } from '@nestjs/passport';

jest.mock('bcrypt', () => ({
  compareSync: jest.fn(),
  hashSync: jest.fn(),
}));

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let userRepository: Repository<User>;
  const mockRepository = {
    findOne: jest.fn(),
  };

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
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

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('register', () => {
    it('should return a user', async () => {
      const user = {
        fullName: 'fullName',
        email: 'email@mail.com',
        password: 'password',
      };

      (bcrypt.hashSync as jest.Mock).mockReturnValue(true);

      const result = await controller.create(user);
      delete user.password;
      expect(result).toEqual({ ...user, token: expect.any(String) });
    });
  });

  it('login', async () => {
    mockRepository.findOne.mockResolvedValue({
      email: 'test@test.com',
      password: 'hashedpassword',
      fullName: 'Test User',
      id: 1,
    });

    (bcrypt.compareSync as jest.Mock).mockReturnValue(true);

    const result = await controller.login({
      email: 'test@test.com',
      password: 'password',
    });

    expect(result).toEqual({
      select: ['email', 'password', 'fullName', 'id'],
      token: 'token',
      where: {
        email: 'test@test.com',
      },
    });
  });

  it('renewToken', async () => {
    const user = {
      id: '1',
      email: 'email@mail.com',
      password: 'password',
      fullName: 'fullName',
      isActive: true,
      roles: ['admin'],
      checkFieldsBeforeInsert: jest.fn(),
    };
    const result = await controller.renewToken(user);
    delete user.roles;
    delete user.isActive;
    expect(result).toEqual({
      ...user,
      token: 'token',
    });
  });

  it('validatedToken', async () => {
    const result = controller.validatedToken();
    expect(result).toEqual({ message: 'Token is valid' });
  });
});
