import { Injectable } from '@nestjs/common';
import { Counter, register } from 'prom-client';

@Injectable()
export class MetricsService {
  private requestCounter: Counter;

  constructor() {
    this.requestCounter = new Counter({
      name: 'auth_requests_total',
      help: 'Total number of requests to the Auth service',
    });
    register.clear();
    register.setDefaultLabels({
      app: 'auth-prometheus',
    });
    register.registerMetric(this.requestCounter);
  }

  incrementRequestCounter(): void {
    this.requestCounter.inc();
  }
}
