import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { MetricsModule } from 'src/metrics/metrics.module';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Client]),
    HttpModule,
    MetricsModule,
  ],
  exports: [ClientService, TypeOrmModule],
})
export class ClientModule {}
