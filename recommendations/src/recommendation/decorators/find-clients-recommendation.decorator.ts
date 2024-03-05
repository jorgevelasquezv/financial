import { applyDecorators } from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Client } from '../entities/client.entity';
import { ProductCode } from '../enums';

export function ApiFindClientsRecommendation() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Returns customers who comply with the terms and conditions of the financial services offered.',
      security: [{ bearerAuth: [] }],
    }),
    ApiHeader({
      name: 'Authorization',
      required: true,
      description: 'Bearer token',
      example: 'Bearer token',
    }),
    ApiParam({
      name: 'productCode',
      description: 'The product code of the clients recommendation to find',
      example: ProductCode.P001,
      enum: ProductCode,
    }),
    ApiResponse({
      status: 200,
      description: 'The record has been successfully retrieved.',
      type: Client,
      isArray: true,
    }),
    ApiResponse({
      status: 404,
      description: 'Not found.',
      schema: {
        example: {
          message: 'The product with product code P999 not found',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    }),
  );
}
