import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Country } from '../enums';

export class ClientRequestDto {
  @ApiProperty({
    format: 'email',
    example: 'test@test.com',
    description: 'This property corresponds to the user email',
    required: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    format: 'number',
    example: 3000000,
    description: 'This property corresponds to the revenue of the client',
    default: 0,
    type: 'integer',
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  revenue?: number;

  @ApiProperty({
    format: 'number',
    type: 'integer',
    example: 18,
    description: 'This property corresponds to the revenue of the client',
    default: 0,
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  age?: number;

  @ApiProperty({
    format: 'text',
    example: Country.COLOMBIA,
    description: 'This property corresponds to the country of the client',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  country?: string;
}
