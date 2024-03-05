import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    }),
    ClientModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
