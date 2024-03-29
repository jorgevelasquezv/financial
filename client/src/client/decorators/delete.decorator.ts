import { HttpCode, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function ApiDelete() {
  return applyDecorators(
    HttpCode(204),
    ApiOperation({
      summary: 'Delete a client',
      description:
        'Delete a client - This operation permits to logic delete a client in Financial System.',
    }),
    ApiParam({
      name: 'email',
      description: 'The email of the client to update',
      example: 'pperez@mail.com',
    }),
    ApiResponse({
      status: 204,
      description: 'The record has been successfully deleted.',
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
