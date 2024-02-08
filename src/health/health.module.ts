import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HttpModule } from '@nestjs/axios';
import { HealthCheckLogger } from './health-check-logger';

@Module({
  imports: [TerminusModule.forRoot({ logger: HealthCheckLogger }), HttpModule],
  controllers: [HealthController],
})
export class HealthModule {}
