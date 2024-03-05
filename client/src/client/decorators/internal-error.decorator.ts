import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiInternalErrorResponse() {
  return applyDecorators(
    ApiResponse({
      status: 500,
      description: 'Internal server error.',
      schema: {
        example: {
          message: 'Internal server error',
          error: 'Internal Server Error',
          statusCode: 500,
        },
      },
    }),
  );
}
