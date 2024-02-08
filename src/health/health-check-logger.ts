import { Logger } from '@nestjs/common';

export class HealthCheckLogger extends Logger {
  constructor() {
    super('HealthCheck');
  }
}
