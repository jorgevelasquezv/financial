import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
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
    ProductModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
