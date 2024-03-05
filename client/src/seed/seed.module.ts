import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [ClientModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
