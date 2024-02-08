import { Inject, Injectable, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';
import { PARAMS_PROVIDER_TOKEN, Params, PinoLogger } from 'nestjs-pino';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends PinoLogger {
  constructor(
    @Inject(PARAMS_PROVIDER_TOKEN) params: Params,
    @Inject(INQUIRER) parentClass: object,
  ) {
    super(params);
    this.setContext(parentClass.constructor.name);
  }
}
