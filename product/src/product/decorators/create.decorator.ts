import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpCode, applyDecorators } from '@nestjs/common';
import { Product } from '../entities/product.entity';

export function ApiCreate() {
  return applyDecorators(
    ApiOperation({
      summary: 'This operation permit create a financial product',
      operationId: 'createProduct',
    }),
    ApiResponse({
      status: 201,
      description: 'The record has been successfully created.',
      type: Product,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request.',
      schema: {
        example: {
          message: [
            'code must be one of the following values: ',
            'code should not be empty',
            'code must be a string',
            'name should not be empty',
            'name must be a string',
            'description should not be empty',
            'description must be a string',
          ],
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    }),
    HttpCode(201),
  );
}
