import { ApiProperty } from '@nestjs/swagger';

export class Response400 {
  @ApiProperty({
    example: [
      'email should not be empty',
      'email must be an email',
      'email must be a string',
    ],
  })
  message: string[];
  @ApiProperty({ example: 'Bad Request' })
  error: string;
  @ApiProperty({ example: 400 })
  statusCode: number;
}
