import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { ProductCode } from './enums';
import { Client, Product } from './entities';
import { ClientRequestDto } from './dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiFindClientsRecommendation,
  ApiFindProductsRecommendation,
  ApiInternalErrorResponse,
} from './decorators';
import { AuthGuard } from './guards/auth.guard';
import { MetricsService } from 'src/metrics/metrics.service';

@Controller('recommendation')
@ApiTags('Recommendation')
@ApiInternalErrorResponse()
@ApiConsumes('application/json')
@ApiProduces('application/json')
@ApiBearerAuth()
export class RecommendationController {
  constructor(
    private readonly recommendationService: RecommendationService,
    private readonly metricService: MetricsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiFindProductsRecommendation()
  findProductsInLineWithClientProfile(
    @Body() client: ClientRequestDto,
    @Request() req,
  ): Promise<Product[]> {
    const token = req.headers.authorization.split(' ')[1];
    this.metricService.incrementRequestCounter();
    return this.recommendationService.findProductsInLineWithClientProfile(
      client,
      token,
    );
  }

  @Get(':productCode')
  @UseGuards(AuthGuard)
  @ApiFindClientsRecommendation()
  findCustomersWithProductsAdjustedToServiceConditions(
    @Param('productCode') productCode: string,
    @Request() req,
  ): Promise<Client[]> {
    const token = req.headers.authorization.split(' ')[1];
    this.metricService.incrementRequestCounter();
    return this.recommendationService.findCustomersWithProductsAdjustedToServiceConditions(
      productCode as ProductCode,
      token,
    );
  }
}
