import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { initialData } from './seed/data/seed-data';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.repository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.repository.save(user);

      delete user.password;

      return { ...user, token: this.generateJWT({ id: user.id }) };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.repository.findOne({
      where: { email },
      select: ['email', 'password', 'fullName', 'id'],
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword)
      throw new UnauthorizedException('Invalid credentials');

    delete user.password;

    return { ...user, token: this.generateJWT({ id: user.id }) };
  }

  async renewToken(user: User) {
    const { id } = user;
    delete user.roles;
    delete user.isActive;
    return { ...user, token: this.generateJWT({ id }) };
  }

  async runSeed(): Promise<User> {
    await this.deleteTables();
    return await this.insertUsers();
  }

  private async deleteTables(): Promise<void> {
    await this.repository.delete({});
  }

  private async insertUsers(): Promise<User> {
    const { users } = initialData;

    const usersCreated: User[] = [];

    users.forEach(({ password, ...userData }) => {
      usersCreated.push(
        this.repository.create({
          ...userData,
          password: bcrypt.hashSync(password, 10),
        }),
      );
    });

    const dbUsers = await this.repository.save(usersCreated);

    return dbUsers[0];
  }

  private generateJWT(jwtPayload: JwtPayload): string {
    const token = this.jwtService.sign(jwtPayload);
    return token;
  }

  private handleDBExceptions(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
