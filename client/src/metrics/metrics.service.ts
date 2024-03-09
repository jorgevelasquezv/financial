import { Injectable } from '@nestjs/common';
import { Counter, register } from 'prom-client';

@Injectable()
export class MetricsService {
  private requestCounter: Counter;

  constructor() {
    this.requestCounter = new Counter({
      name: 'client_requests_total',
      help: 'Total number of requests to the Client service',
    });
    register.clear();
    register.setDefaultLabels({
      app: 'client-prometheus',
    });
    register.registerMetric(this.requestCounter);
  }

  incrementRequestCounter(): void {
    this.requestCounter.inc();
  }
}
