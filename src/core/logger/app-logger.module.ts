import { Global, Module } from '@nestjs/common';
import { Params, LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { AppLogger } from './app-logger';
import { LogFormat } from './types';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const pinoParams: Params = {
          pinoHttp: {
            level: 'trace',
          },
        };

        const logFormat = config.getOrThrow<LogFormat>('logger.format');
        if (logFormat === LogFormat.Pretty) {
          pinoParams.pinoHttp = {
            ...pinoParams.pinoHttp,
            transport: {
              target: 'pino-pretty',
              options: {
                singleLine: true,
              },
            },
          };
        }

        return pinoParams;
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class AppLoggerModule {}
