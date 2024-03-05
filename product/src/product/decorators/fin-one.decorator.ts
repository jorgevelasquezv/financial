import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';

export function ApiFindOne() {
  return applyDecorators(
    ApiOperation({
      summary:
        'This operation permit find one financial product by code and status.',
      operationId: 'FindAllProducts',
    }),
    ApiParam({
      name: 'code',
      description: 'The code of the product to find',
      example: 'P001',
    }),
    ApiQuery({
      name: 'isActive',
      required: false,
      description:
        'Filter by status of product en data base (true or false), default is true',
      type: Boolean,
      example: true,
    }),
    ApiResponse({
      status: 200,
      description: 'The record has been successfully retrieved.',
      type: Product,
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
