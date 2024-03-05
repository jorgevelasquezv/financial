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

@ApiInternalErrorResponse()
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiCreate()
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiFindAll()
  findAll(@Query('isActive') isActive?: boolean): Promise<Client[]> {
    return this.clientService.findAll(isActive);
  }

  @Get(':email')
  @UseGuards(AuthGuard)
  @ApiFindOne()
  findOne(@Param('email') email: string) {
    return this.clientService.findOne(email);
  }

  @Put(':email')
  @ApiUpdate()
  @UseGuards(AuthGuard)
  update(
    @Param('email') email: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return this.clientService.update(email, updateClientDto);
  }

  @Delete(':email')
  @ApiDelete()
  @UseGuards(AuthGuard)
  remove(@Param('email') email: string) {
    return this.clientService.remove(email);
  }
}
