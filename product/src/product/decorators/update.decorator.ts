import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ProductCode } from '../enums';

export function ApiUpdate() {
  return applyDecorators(
    ApiOperation({
      summary:
        'This operation permit update one financial product by code and status.',
      operationId: 'FindAllProducts',
    }),
    ApiParam({
      name: 'code',
      description: 'The code of the product to update',
      example: ProductCode.P001,
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
          message: 'Product with code P999 not found',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    }),
  );
}
