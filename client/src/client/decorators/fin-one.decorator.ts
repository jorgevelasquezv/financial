import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Client } from '../entities/client.entity';

export function ApiFindOne() {
  return applyDecorators(
    ApiOperation({
      summary: 'Find a client by email',
      description:
        'Find a client by email - This operation permits to retrieve a client in Financial System.',
    }),
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
