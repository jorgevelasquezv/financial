import { applyDecorators } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateClientDto } from '../dto/update-client.dto';

export function ApiUpdate() {
  return applyDecorators(
    ApiParam({
      name: 'email',
      description: 'The email of the client to update',
      example: 'pperez@mail.com',
    }),
    ApiResponse({
      status: 200,
      description: 'The client has been successfully updated.',
      type: UpdateClientDto,
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
