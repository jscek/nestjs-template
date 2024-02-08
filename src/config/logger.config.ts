import { registerAs } from '@nestjs/config';
import { LogFormat } from '../core/logger/types';

export default registerAs('logger', () => ({
  format: process.env.LOG_FORMAT ?? LogFormat.JSON,
}));
