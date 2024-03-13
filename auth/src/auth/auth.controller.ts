import { Controller, Post, Body, Get, HttpCode } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {
  ApiInternalErrorResponse,
  ApiLoginResponse,
  ApiRenewTokenResponse,
  ApiValidTokenResponse,
  Auth,
  GetUser,
} from './decorators';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces';
import { ResponseUserDto } from './dto';
import { MetricsService } from '../metrics/metrics.service';

@ApiTags('Auth')
@ApiInternalErrorResponse()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly metricsServices: MetricsService,
  ) {}

  @Post('/register')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiExcludeEndpoint()
  create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    this.metricsServices.incrementRequestCounter();
    return this.authService.create(createUserDto);
  }

  @Post('/login')
  @HttpCode(200)
  @ApiLoginResponse()
  login(@Body() loginUserDto: LoginUserDto): Promise<ResponseUserDto> {
    this.metricsServices.incrementRequestCounter();
    return this.authService.login(loginUserDto);
  }

  @Get('/renew-token')
  @Auth()
  @ApiRenewTokenResponse()
  renewToken(@GetUser() user: User): Promise<ResponseUserDto> {
    this.metricsServices.incrementRequestCounter();
    return this.authService.renewToken(user);
  }

  @Get('/valid-token')
  @Auth()
  @ApiValidTokenResponse()
  validatedToken() {
    this.metricsServices.incrementRequestCounter();
    return { message: 'Token is valid' };
  }

  @Post('/seed')
  @ApiExcludeEndpoint()
  seed(): Promise<User> {
    return this.authService.runSeed();
  }

  @Get('/private')
  @ApiExcludeEndpoint()
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  testingPrivateRoute4(@GetUser() user: User) {
    return { user };
  }
}
