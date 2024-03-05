import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(
    @InjectRepository(Client)
    private readonly repository: Repository<Client>,
  ) {}
  async create(createClientDto: CreateClientDto): Promise<Client> {
    try {
      const { accessKey, ...userData } = createClientDto;

      const user = this.repository.create({
        ...userData,
        isActive: true,
        accessKey: bcrypt.hashSync(accessKey, 10),
      });

      await this.repository.save(user);

      delete user.accessKey;

      return { ...user };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(isActive: boolean = true): Promise<Client[]> {
    return await this.repository.find({ where: { isActive } });
  }

  async findOne(email: string): Promise<Client> {
    const client = await this.repository.findOneBy({ email });
    if (!client)
      throw new BadRequestException(`Client with email ${email} not found`);
    return client;
  }

  async update(
    email: string,
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    const { accessKey, ...toUpdate } = updateClientDto;

    const { id } = await this.findOne(email);

    const clientUpdated = await this.repository.save({
      id,
      ...toUpdate,
      accessKey: bcrypt.hashSync(accessKey, 10),
    });

    delete clientUpdated.accessKey;

    return clientUpdated;
  }

  async remove(email: string) {
    const client = await this.findOne(email);
    await this.repository.save({ ...client, isActive: false });
  }

  private handleDBExceptions(error: any): never {
    console.log(error);

    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
