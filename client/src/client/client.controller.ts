import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import {
  ApiCreate,
  ApiDelete,
  ApiFindAll,
  ApiFindOne,
  ApiInternalErrorResponse,
  ApiUpdate,
} from './decorators';
import { AuthGuard } from './guards/auth.guard';
import { MetricsService } from 'src/metrics/metrics.service';

@ApiInternalErrorResponse()
@Controller('client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly metricService: MetricsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiCreate()
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    this.metricService.incrementRequestCounter();
    return this.clientService.create(createClientDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiFindAll()
  findAll(@Query('isActive') isActive?: boolean): Promise<Client[]> {
    this.metricService.incrementRequestCounter();
    return this.clientService.findAll(isActive);
  }

  @Get(':email')
  @UseGuards(AuthGuard)
  @ApiFindOne()
  findOne(@Param('email') email: string) {
    this.metricService.incrementRequestCounter();
    return this.clientService.findOne(email);
  }

  @Put(':email')
  @ApiUpdate()
  @UseGuards(AuthGuard)
  update(
    @Param('email') email: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    this.metricService.incrementRequestCounter();
    return this.clientService.update(email, updateClientDto);
  }

  @Delete(':email')
  @ApiDelete()
  @UseGuards(AuthGuard)
  remove(@Param('email') email: string) {
    this.metricService.incrementRequestCounter();
    return this.clientService.remove(email);
  }
}
