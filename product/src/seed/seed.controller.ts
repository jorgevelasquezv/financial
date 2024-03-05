import { Controller, HttpCode, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('seed')
@ApiExcludeController()
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  @HttpCode(201)
  seed(): Promise<void> {
    return this.seedService.runSeed();
  }
}
