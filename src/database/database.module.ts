import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { AppLoggerModule } from '../core/logger/app-logger.module';

@Global()
@Module({
  imports: [AppLoggerModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
