import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseUserDto } from '../dto';
import { Response400 } from '../dto/error-response/error-response-400';
import { Response401 } from '../dto/error-response';

export function ApiLoginResponse() {
  return applyDecorators(
    ApiOperation({
      summary: 'Login user',
      description:
        'Login user - This operation permits to login a user in Financial System with credentials email and password.',
    }),
    ApiResponse({
      status: 200,
      description: 'User logged in successfully',
      type: ResponseUserDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      type: Response400,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
      type: Response401,
    }),
  );
}
