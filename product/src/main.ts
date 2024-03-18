import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('bootstrap');

  const API_PREFIX = process.env.API_PREFIX || '/api/v1';

  app.setGlobalPrefix(API_PREFIX);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Product API')
    .setDescription(
      'The Product API endpoints. Stores and manages financial product information ',
    )
    .setVersion('1.0')
    .addServer(`${API_PREFIX}`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${API_PREFIX}/doc`, app, document);

  const PORT = process.env.PORT || 3002;
  await app.listen(PORT);
  logger.log(`Server started on port: ${PORT}`);
}
bootstrap();
