import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateClientDto {
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
    format: 'password',
    example: 'AbC123456',
    pattern: '/(?:(?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/',
    description: 'This property corresponds to the user password',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  accessKey: string;

  @ApiProperty({
    format: 'date',
    example: '1990-12-12',
    description: 'This property corresponds to the birthday of the user',
    pattern: '^(19|20)d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]d|3[01])$',
  })
  @IsString()
  @Matches(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
    message: 'The birthday must be a valid date',
  })
  birthday: string;
}
