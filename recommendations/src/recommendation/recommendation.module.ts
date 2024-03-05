import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities';

@Module({
  imports: [HttpModule, ConfigModule, TypeOrmModule.forFeature([Client])],
  controllers: [RecommendationController],
  providers: [RecommendationService],
  exports: [RecommendationService, TypeOrmModule],
})
export class RecommendationModule {}
