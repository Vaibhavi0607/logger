import chalk from 'chalk';
import dayjs from 'dayjs';
import { createLogger, format, transports } from 'winston';

// Create logger instance.
export const logger = createLogger({
  level: 'debug',
  transports: [new transports.Console({})],

  // format log messages.
  format: format.printf(options => {
    const level = options.level.toUpperCase();
    let message = `${dayjs().format()} - ${level}: `;
    if (options.message) {
      message = message + options.message;
    }
    return colorMessage(level, message);
  }),
});

/**
 * @description - Color the log messages based on message level.
 * @param { string } level - log level.
 * @param { string } message - log message.
 * @returns { string } - colored log message based on log level
 */
const colorMessage = (level: string, message: string): string => {
  if (level === 'INFO') {
    message = chalk.green(message);
  } else if (level === 'WARN') {
    message = chalk.yellow(message);
  } else if (level === 'ERROR') {
    message = chalk.red(message);
  } else if (level === 'DEBUG') {
    message = chalk.blue(message);
  } else {
    message = chalk.cyan(message);
  }

  return message;
};
