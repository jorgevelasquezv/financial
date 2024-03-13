import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Country, ProductCode } from './enums';
import { HttpService } from '@nestjs/axios';
import { Client, Product } from './entities';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, MoreThan, Repository } from 'typeorm';
import { ClientRequestDto } from './dto';

type ErrorMessage = {
  message?: string;
  error?: string;
  statusCode?: number;
};

@Injectable()
export class RecommendationService {
  private readonly logger = new Logger(RecommendationService.name);

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly httpService: HttpService,
  ) {}

  async findProductsInLineWithClientProfile(
    clientRequest: ClientRequestDto,
    token: string,
  ): Promise<Product[]> {
    const products: Product[] = await this.getProducts(token);
    const {
      email,
      country: countryRequest,
      revenue: revenueRequest,
      age: ageRequest,
    } = clientRequest;

    const client: Client = await this.findOneClientByEmail(email);

    if (countryRequest) client.country = countryRequest;
    if (revenueRequest) client.revenue = revenueRequest;

    const { country, revenue } = client;

    if (!country)
      throw new BadRequestException('Client not have property country');
    if (!revenue)
      throw new BadRequestException('Client not have property revenue');

    const { birthday } = client;

    const age: number =
      ageRequest || new Date().getFullYear() - new Date(birthday).getFullYear();

    const productsFiltered: Product[] = products.filter(
      ({ fromAge, countries, minRevenue }) => {
        if (age < fromAge) return false;
        if (revenue < minRevenue) return false;
        if (countries.length > 0 && !countries.includes(country as Country))
          return false;

        return true;
      },
    );

    return productsFiltered;
  }

  private async findOneClientByEmail(email: string): Promise<Client> {
    const client = await this.clientRepository.findOneBy({ email });
    if (!client)
      throw new NotFoundException(`Client with email ${email} not found`);
    return client;
  }

  async findCustomersWithProductsAdjustedToServiceConditions(
    productCode: ProductCode,
    token: string,
  ): Promise<Client[]> {
    const product: Product = await this.getProduct(productCode, token);

    const { countries, fromAge, minRevenue } = product;

    const currentDate = new Date();
    const fromAgeDate = new Date(
      currentDate.getFullYear() - fromAge,
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    const formattedFromDate = fromAgeDate.toISOString().split('T')[0];

    const filteredClients = await this.clientRepository.find({
      where: {
        birthday: LessThan(formattedFromDate),
        revenue: MoreThan(minRevenue),
        ...(countries.length > 0 && { country: In(countries) }),
      },
    });

    return filteredClients;
  }

  private async getProduct(
    productCode: ProductCode,
    token: string,
  ): Promise<Product> {
    const PRODUCT_HOST_API = process.env.PRODUCT_HOST_API;
    const { data } = await firstValueFrom(
      this.httpService
        .get<Product>(`${PRODUCT_HOST_API}/product/${productCode}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .pipe(
          catchError((error: AxiosError) => {
            const errorMessage = error.response.data as ErrorMessage;
            if (errorMessage.statusCode === 404) {
              throw new NotFoundException(
                `Product with code ${productCode} not found in products`,
              );
            }
            this.logger.error(error.response.data);
            throw error;
          }),
        ),
    );
    return data;
  }

  private async getProducts(token: string): Promise<Product[]> {
    const PRODUCT_HOST_API = process.env.PRODUCT_HOST_API;
    const { data } = await firstValueFrom(
      this.httpService
        .get<
          Product[]
        >(`${PRODUCT_HOST_API}/product/`, { headers: { Authorization: `Bearer ${token}` } })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw error;
          }),
        ),
    );
    return data;
  }
}
