import winston from 'winston';

import { logger } from './logger';

export default class Logger {
  constructor(public logTransform?: (msg: string, meta?: Record<string, unknown>) => string, public metadata?: Record<string, unknown>) {}

  error = (message: string, options?: Record<string, unknown>): string | winston.Logger => this.log('error', message, options);
  warn = (message: string, options?: Record<string, unknown>): string | winston.Logger => this.log('warn', message, options);
  info = (message: string, options?: Record<string, unknown>): string | winston.Logger => this.log('info', message, options);
  debug = (message: string, options?: Record<string, unknown>): string | winston.Logger => this.log('debug', message, options);

  /**
   * @param { string} level Log severity level. Takes 4 values error, warn, info, debug.
   * @param { string} message message to be logged.
   * @param { Record<string, unknown> } options options
   * @returns { string | winston.Logger }
   */
  private log = (level: string, message: string, options?: Record<string, unknown>): string | winston.Logger => {
    if (this.logTransform) {
      message = this.logTransform(message, this.metadata);
    }
    return logger.log(level, message, options);
  };
}
