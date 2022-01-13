import Logger from './index';

const meta = {
  customerId: '123456',
  requestId: 'OKRA-123456',
  timestamp: '2345678',
};

const logTransform = (message: string, metadata: Record<string, unknown>) : string => `timestamp: ${metadata.timestamp} | customerId: ${metadata.customerId} | requestId: ${metadata.requestId} | message: ${message}`;

const logger = new Logger(meta, logTransform);
logger.debug('kaa beta');
// newlogger.info('kaa bitiya');