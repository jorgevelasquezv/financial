import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Country } from '../enums/countries.enum';
import { ProductCode } from '../enums';

export class CreateProductDto {
  @ApiProperty({
    format: 'string',
    type: 'string',
    enum: ProductCode,
    example: ProductCode.P001,
    description: 'This property corresponds to the product code',
  })
  @IsString()
  @IsNotEmpty()
  code: ProductCode;

  @ApiProperty({
    format: 'string',
    example: 'This is a product description',
    description: 'This property corresponds to the product description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    format: 'array',
    example: [Country.COLOMBIA, Country.ECUADOR, Country.PANAMA],
    enum: Country,
    description: 'This property corresponds to the product countries',
  })
  @IsNotEmpty()
  countries: Country[];

  @ApiProperty({
    format: 'number',
    example: '18',
    description: 'This property corresponds to the product from age',
  })
  @IsInt()
  @Min(0)
  fromAge: number;

  @ApiProperty({
    format: 'number',
    example: '1000000',
    description: 'This property corresponds to the product min revenue',
  })
  @IsInt()
  @Min(0)
  minRevenue: number;

  @ApiProperty({
    format: 'boolean',
    example: true,
    description: 'This property corresponds to the product status',
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean = true;
}
