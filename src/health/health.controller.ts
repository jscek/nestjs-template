import { Controller, Get, VERSION_NEUTRAL, Version } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { DatabaseService } from '../database/database.service';
import { AppLogger } from '../core/logger/app-logger';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: DatabaseService,
    private readonly prismaHealth: PrismaHealthIndicator,
    private readonly logger: AppLogger,
  ) {}

  @Get()
  @Version(VERSION_NEUTRAL)
  @HealthCheck()
  check() {
    this.logger.debug('test');

    return this.health.check([
      () => this.prismaHealth.pingCheck('db', this.db),
    ]);
  }
}
