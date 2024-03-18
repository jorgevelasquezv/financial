import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Client } from '../entities/client.entity';

export function ApiFindAll() {
  return applyDecorators(
    ApiOperation({
      summary: 'Find all clients',
      description:
        'Find all clients - This operation permits to retrieve all clients in Financial System.',
    }),
    ApiResponse({
      status: 200,
      description: 'The records has been successfully retrieved.',
      type: [Client],
    }),
    ApiQuery({
      name: 'isActive',
      required: false,
      description:
        'Filter by status of client en data base (true or false), default is true',
      type: Boolean,
      example: true,
    }),
  );
}
