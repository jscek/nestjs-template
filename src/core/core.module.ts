import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { HealthModule } from '../health/health.module';
import { AppLoggerModule } from './logger/app-logger.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '../config/database.config';
import loggerConfig from '../config/logger.config';

@Module({
  imports: [
    AppLoggerModule,
    // EnvModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    HealthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, loggerConfig],
    }),
  ],
})
export class CoreModule {}
