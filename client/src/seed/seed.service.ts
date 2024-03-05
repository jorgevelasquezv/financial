import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from '../client/client.service';
import { Client } from '../client/entities/client.entity';
import { Repository } from 'typeorm';
import { SEED_CLIENTS } from './data/clients-data.seed';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly clientService: ClientService,
  ) {}

  async runSeed(): Promise<void> {
    await this.deleteTables();
    await this.seedProducts();
  }

  private async deleteTables(): Promise<void> {
    await this.clientRepository.delete({});
  }

  private async seedProducts(): Promise<void> {
    const promises = SEED_CLIENTS.map(async (client) =>
      this.clientService.create(client),
    );

    await Promise.all(promises);
  }
}
