import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Client } from '../entities/client.entity';
import { HttpCode, applyDecorators } from '@nestjs/common';

export function ApiCreate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new client',
      description:
        'Create a new client - This operation permits to create a new client in Financial System.',
    }),
    ApiResponse({
      status: 201,
      description: 'The record has been successfully created.',
      type: Client,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request.',
      schema: {
        example: {
          message: [
            'property emails should not exist',
            'email must be an email',
            'email must be a string',
          ],
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    }),
    HttpCode(201),
  );
}
