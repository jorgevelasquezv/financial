import { ApiProperty } from '@nestjs/swagger';

export class Response500 {
  @ApiProperty({ example: 'Internal server error' })
  message: string;
  @ApiProperty({ example: 'Internal Server Error' })
  error: string;
  @ApiProperty({ example: 500 })
  statusCode: number;
}
