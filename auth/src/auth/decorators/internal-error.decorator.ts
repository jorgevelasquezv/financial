import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response500 } from '../dto/error-response';

export function ApiInternalErrorResponse() {
  return applyDecorators(
    ApiResponse({
      status: 500,
      description: 'Internal server error.',
      type: Response500,
    }),
  );
}
