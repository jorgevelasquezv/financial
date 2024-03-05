import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseUserDto } from '../dto';
import { Response401 } from '../dto/error-response';

export function ApiValidTokenResponse() {
  return applyDecorators(
    ApiOperation({
      summary: 'Valid token',
      description:
        'Valid token - This operation permits to validate the token of a user in Financial System.',
    }),
    ApiResponse({
      status: 200,
      description: 'Internal server error.',
      type: ResponseUserDto,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
      type: Response401,
    }),
  );
}
