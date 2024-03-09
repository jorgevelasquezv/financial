import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendationModule } from './recommendation/recommendation.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.CLIENT_DB_HOST,
      port: +process.env.CLIENT_DB_PORT,
      database: process.env.CLIENT_DB_NAME,
      username: process.env.CLIENT_DB_USER,
      password: process.env.CLIENT_DB_PASSWORD,
      autoLoadEntities: true,
    }),
    RecommendationModule,
    MetricsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
