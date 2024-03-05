import { applyDecorators } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { Client } from '../entities/client.entity';

export function ApiFindOne() {
  return applyDecorators(
    ApiParam({
      name: 'email',
      description: 'The email of the client to find',
      example: 'pperez@mail.com',
    }),
    ApiResponse({
      status: 200,
      description: 'The record has been successfully retrieved.',
      type: Client,
    }),
    ApiResponse({
      status: 404,
      description: 'Not found.',
      schema: {
        example: {
          message: 'Client with email email@mail.com not found',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    }),
  );
}
