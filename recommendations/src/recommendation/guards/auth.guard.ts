import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { Request } from 'express';
import { catchError, firstValueFrom } from 'rxjs';

type ErrorMessage = {
  message?: string;
  error?: string;
  statusCode?: number;
};

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    try {
      request.user = await this.validatedToken(token);
    } catch {
      throw new UnauthorizedException('Invalid Token');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async validatedToken(token: string): Promise<any> {
    const AUTH_HOST_API_VALID_TOKEN = process.env.AUTH_HOST_API_VALID_TOKEN;
    const headersRequest = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const { data } = await firstValueFrom(
      this.httpService
        .get<void>(AUTH_HOST_API_VALID_TOKEN, {
          headers: {
            ...headersRequest,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            const errorMessage = error.response.data as ErrorMessage;

            if (errorMessage.statusCode === 401) {
              throw new UnauthorizedException('Invalid Token');
            }
            this.logger.error(error.response.data);
            throw error;
          }),
        ),
    );
    return data;
  }
}
