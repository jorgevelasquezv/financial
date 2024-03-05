import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [ConfigModule, TypeOrmModule.forFeature([Client]), HttpModule],
  exports: [ClientService, TypeOrmModule],
})
export class ClientModule {}
