import { ApiProperty } from '@nestjs/swagger';

export class Response401 {
  @ApiProperty({ example: 'Invalid credentials' })
  message: string;
  @ApiProperty({ example: 'Unauthorized' })
  error: string;
  @ApiProperty({ example: 401 })
  statusCode: number;
}
