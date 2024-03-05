import { CreateProductDto } from '../../product/dto/create-product.dto';
import { ProductCode } from '../../product/enums';
import { Country } from '../../product/enums/countries.enum';

export const SEED_PRODUCTS: CreateProductDto[] = [
  {
    code: ProductCode.P001,
    description: 'Cuentas de ahorros',
    countries: [Country.COLOMBIA],
    fromAge: 18,
    minRevenue: 0,
    isActive: true,
  },
  {
    code: ProductCode.P002,
    description: 'Tarjeta débito',
    countries: [Country.COLOMBIA],
    fromAge: 18,
    minRevenue: 1300000,
    isActive: true,
  },
  {
    code: ProductCode.P003,
    description: 'Tarjeta crédito',
    countries: [Country.COLOMBIA],
    fromAge: 20,
    minRevenue: 2500000,
    isActive: true,
  },
  {
    code: ProductCode.P004,
    description: 'Seguro',
    countries: [],
    fromAge: 15,
    minRevenue: 800000,
    isActive: true,
  },
  {
    code: ProductCode.P005,
    description: 'Inversiones',
    countries: [],
    fromAge: 25,
    minRevenue: 4500000,
    isActive: true,
  },
  {
    code: ProductCode.P006,
    description: 'Giros',
    countries: [
      Country.COLOMBIA,
      Country.PERU,
      Country.ECUADOR,
      Country.PANAMA,
    ],
    fromAge: 0,
    minRevenue: 0,
    isActive: true,
  },
  {
    code: ProductCode.P007,
    description: 'Tarjeta amparada',
    countries: [],
    fromAge: 15,
    minRevenue: 0,
    isActive: true,
  },
];
