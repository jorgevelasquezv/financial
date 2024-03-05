import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Product } from '../entities';

export function ApiFindProductsRecommendation() {
  return applyDecorators(
    ApiOperation({ summary: 'Return products in line with client profile' }),
    ApiHeader({
      name: 'Authorization',
      required: true,
      description: 'Bearer token',
      example: 'Bearer token',
    }),
    ApiResponse({
      status: 200,
      description: 'The records has been successfully retrieved.',
      type: [Product],
    }),
    ApiBadRequestResponse({
      description: 'Bad request.',
      schema: {
        example: {
          message: 'Client not have property country',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    }),
  );
}
