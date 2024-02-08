import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppLogger } from '../core/logger/app-logger';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly logger: AppLogger) {
    super();
  }

  async onModuleInit() {
    this.logger.info('Connecting to database');
    try {
      await this.$connect();
      this.logger.info('Connected successfully');
    } catch (error) {
      this.logger.error('Failed to connect');
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
