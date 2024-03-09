import { Injectable } from '@nestjs/common';
import { Counter, register } from 'prom-client';

@Injectable()
export class MetricsService {
  private requestCounter: Counter;

  constructor() {
    this.requestCounter = new Counter({
      name: 'product_requests_total',
      help: 'Total number of requests to the Product service',
    });
    register.clear();
    register.setDefaultLabels({
      app: 'product-prometheus',
    });
    register.registerMetric(this.requestCounter);
  }

  incrementRequestCounter(): void {
    this.requestCounter.inc();
  }
}
