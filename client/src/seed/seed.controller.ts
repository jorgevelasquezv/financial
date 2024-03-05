import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('seed')
@ApiExcludeController()
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  seedClients() {
    return this.seedService.runSeed();
  }
}
