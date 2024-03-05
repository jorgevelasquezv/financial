import { HttpCode, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function ApiDelete() {
  return applyDecorators(
    ApiOperation({
      summary:
        'This operation permit logical delete one financial product by code',
      operationId: 'FindAllProducts',
    }),
    HttpCode(204),
    ApiParam({
      name: 'code',
      description: 'The code of the product to find',
      example: 'P001',
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
          message: 'Product with code P999 not found',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    }),
  );
}
