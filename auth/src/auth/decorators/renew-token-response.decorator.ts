import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseUserDto } from '../dto';
import { Response401 } from '../dto/error-response';

export function ApiRenewTokenResponse() {
  return applyDecorators(
    ApiOperation({
      summary: 'Renew token',
      description:
        'Renew token - This operation permits to renew the token of a user in Financial System.',
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
