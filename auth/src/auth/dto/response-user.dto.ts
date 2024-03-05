import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ResponseUserDto {
  @ApiProperty({
    format: 'uuid',
    example: 'db8a8477-1529-46d5-bc24-5caed2d07100',
    description: 'This property corresponds to the user id',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({
    format: 'email',
    example: 'test@test.com',
    description: 'This property corresponds to the user email',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Peter Loan',
    description: 'This property corresponds to the user full name',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    format: 'token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiOGE4NDc3LTE1MjktNDZkNS1iYzI0LTVjYWVkMmQwNzEwMCIsImlhdCI6MTcwOTI2NjQyNiwiZXhwIjoxNzA5MjczNjI2fQ.f-qLzCSPGbYMjr66EnruL8BINoiaisnmEdR29E7ga88',
    description: 'This property corresponds to the user token',
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
