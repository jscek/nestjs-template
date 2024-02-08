import { ConfigurableModuleBuilder } from '@nestjs/common';
import { AppLoggerModuleOptions } from './app-logger.module-options';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<AppLoggerModuleOptions>().build();
