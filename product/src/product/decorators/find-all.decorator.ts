import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';

export function ApiFindAll() {
  return applyDecorators(
    ApiOperation({
      summary: 'This operation permit find all financial product by status.',
      operationId: 'FindAllProducts',
    }),
    ApiResponse({
      status: 200,
      description: 'The records has been successfully retrieved.',
      type: [Product],
    }),
    ApiQuery({
      name: 'isActive',
      required: false,
      description:
        'Filter by status of product en data base (true or false), default is true',
      type: Boolean,
      example: true,
    }),
  );
}
