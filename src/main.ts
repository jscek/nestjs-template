import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { v4 } from 'uuid';
import { RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import pkg from '../package.json';
import helmet from '@fastify/helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      requestIdHeader: 'x-request-id',
      genReqId: () => v4(),
    }),
    { bufferLogs: true },
  );

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  setupSwagger(app);

  await app.register(helmet);
  app.useLogger(app.get(Logger));
  app.flushLogs();
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableShutdownHooks();

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  const logger = app.get(Logger);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

function setupSwagger(app: NestFastifyApplication): void {
  const { name, description, version } = pkg;

  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
