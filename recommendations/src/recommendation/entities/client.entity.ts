import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    format: 'uuid',
    description: 'This property must be a valid uuid ',
    uniqueItems: true,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    format: 'email',
    example: 'test@test.com',
    description: 'This property corresponds to the client email',
  })
  @Column({ type: 'text', unique: true })
  email: string;

  @ApiProperty({
    format: 'text',
    example: 'Peter Loan',
    description: 'This property corresponds to the full name of the client',
  })
  @Column({ type: 'text' })
  fullName: string;

  @ApiProperty({
    format: 'password',
    example: 'AbC123456',
    pattern: '/(?:(?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/',
    description: 'This property corresponds to the access key of the client',
  })
  @Column({ type: 'text', select: false })
  accessKey: string;

  @ApiProperty({
    format: 'date',
    example: '1990-12-12',
    pattern: '^(19|20)d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]d|3[01])$',
    description: 'This property corresponds to the birthday of the client',
  })
  @Column({ type: 'text', nullable: true })
  birthday: string;

  @ApiProperty({
    format: 'number',
    type: 'integer',
    example: 3000000,
    description: 'This property corresponds to the revenue of the client',
    default: 0,
  })
  @Column({ type: 'integer', nullable: true, default: 0 })
  revenue: number;

  @ApiProperty({
    format: 'number',
    type: 'integer',
    example: 3000000,
    description: 'This property corresponds to the revenue of the client',
    default: 0,
  })
  age: number;

  @ApiProperty({
    format: 'text',
    example: 'Medellin',
    description: 'This property corresponds to the city of the client',
  })
  @Column({ type: 'text', nullable: true })
  city: string;

  @ApiProperty({
    format: 'text',
    example: 'Colombia',
    description: 'This property corresponds to the country of the client',
  })
  @Column({ type: 'text', nullable: true })
  country: string;

  @ApiProperty({
    format: 'boolean',
    example: true,
    description: 'This property corresponds to the status of the client',
    default: true,
  })
  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
