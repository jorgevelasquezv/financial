import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from '../enums/countries.enum';
import { ProductCode } from '../enums';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    format: 'uuid',
    description: 'This property must be a valid uuid ',
    uniqueItems: true,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Column({ unique: true })
  @ApiProperty({
    format: 'string',
    example: ProductCode.P001,
    type: 'string',
    enum: ProductCode,
    description: 'This property corresponds to the product code',
  })
  code: ProductCode;

  @Column()
  @ApiProperty({
    format: 'string',
    example: 'This is a product description',
    description: 'This property corresponds to the product description',
  })
  description: string;

  @Column({ type: 'text', array: true, default: [] })
  @ApiProperty({
    format: 'array',
    type: 'string',
    enum: Country,
    example: ['PE', 'EC', 'CO'],
    description: 'This property corresponds to the product countries',
  })
  countries: Country[];

  @Column({ type: 'int' })
  @ApiProperty({
    format: 'number',
    example: '18',
    description: 'This property corresponds to the product from age',
  })
  fromAge: number;

  @Column({ type: 'int' })
  @ApiProperty({
    format: 'number',
    example: '1000000',
    description: 'This property corresponds to the product min revenue',
  })
  minRevenue: number;

  @Column({ type: 'boolean', default: 'true' })
  @ApiProperty({
    format: 'boolean',
    example: true,
    description: 'This property corresponds to the product status',
  })
  isActive: boolean;
}
