import winston from 'winston';

import { logger } from './logger';

export default class Logger {
  constructor(public metadata: Record<string, unknown>, public logTransform?: (msg: string, meta: Record<string, unknown>) => string) {}

  debug = (message: string, data?: Record<string, unknown>): string | winston.Logger => this.log('debug', message, data);
  error = (message: string, data?: Record<string, unknown>): string | winston.Logger => this.log('error', message, data);
  info =  (message: string, data?: Record<string, unknown>): string | winston.Logger => this.log('info', message, data);
  warn = (message: string, data?: Record<string, unknown>): string | winston.Logger => this.log('warn', message, data);

  private log = (level: string, message: string, data?: Record<string, unknown>): string | winston.Logger => {
    if (this.logTransform) {
      message = this.logTransform(message, this.metadata);
    }
    return logger.log(level, message, data);
  };
}