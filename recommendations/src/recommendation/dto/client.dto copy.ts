import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class ClientDto {
  @ApiProperty({
    format: 'email',
    example: 'test@test.com',
    description: 'This property corresponds to the user email',
    required: false,
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: 'Peter Loan',
    description: 'This property corresponds to the user full name',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    format: 'date',
    example: '1990-12-12',
    pattern: '^(19|20)d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]d|3[01])$',
    description: 'This property corresponds to the birthday of the client',
    required: false,
  })
  @IsString()
  @Matches(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
    message: 'The birthday must be a valid date',
  })
  @IsOptional()
  birthday?: string;

  @ApiProperty({
    format: 'number',
    example: 3000000,
    description: 'This property corresponds to the revenue of the client',
    default: 0,
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  revenue?: number;

  @ApiProperty({
    format: 'text',
    example: 'Medellin',
    description: 'This property corresponds to the city of the client',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city?: string;

  @ApiProperty({
    format: 'text',
    example: 'Colombia',
    description: 'This property corresponds to the country of the client',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  country?: string;

  @ApiProperty({
    format: 'boolean',
    example: true,
    description: 'This property corresponds to the status of the client',
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean = true;
}
