/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import dayjs from 'dayjs';
import Sinon from 'sinon';

import { logger } from './logger';

import Logger from './index';

interface Metadata {
  customerId: number;
  requestId: string;
  timestamp: string;
}

describe('Test logger', () => {
  // declare variables
  let loggerWithoutFormat: Logger;
  let loggerWithFormat: Logger;
  let logFnSpy: Sinon.SinonSpy;
  let logTransformSpy: Sinon.SinonSpy;
  let sandbox: Sinon.SinonSandbox;

  // runtime generated metadata.
  const meta: Metadata = {
    customerId: Math.floor(Math.random() * 1 * 1000000 + 1),
    requestId: `OKRA-${Math.floor(Math.random() * 1 * 100000000 + 1)}`,
    timestamp: dayjs().format(),
  };

  // format for logs.
  const logTransform = (message: string, metadata: Metadata): string =>
    `timestamp: ${metadata.timestamp} | customerId: ${metadata.customerId} | requestId: ${metadata.requestId} | message: ${message}`;

  before(() => {
    sandbox = Sinon.createSandbox();
  });

  beforeEach(() => {
    loggerWithFormat = new Logger(logTransform as any, meta as unknown as Record<string, unknown>);
    loggerWithoutFormat = new Logger();
    logFnSpy = Sinon.spy(logger, 'log');
    logTransformSpy = Sinon.spy(loggerWithFormat, 'logTransform');
  });

  afterEach(() => {
    logFnSpy.restore();
    logTransformSpy.restore();
  });

  after(() => {
    sandbox.restore();
  });

  describe('Test debug log...', () => {
    it('with logTransform...', () => {
      loggerWithFormat.debug('debug log');
      expect(logFnSpy.called).to.be.true;
      expect(logTransformSpy.called).to.be.true;
    });

    it('without logTransform...', () => {
      loggerWithoutFormat.debug('debug log');
      expect(logFnSpy.called).to.be.true;
    });
  });

  describe('Test info log...', () => {
    it('with logTransform...', () => {
      loggerWithFormat.info('info log');
      expect(logFnSpy.called).to.be.true;
      expect(logTransformSpy.called).to.be.true;
    });

    it('without logTransform...', () => {
      loggerWithoutFormat.info('info log');
      expect(logFnSpy.called).to.be.true;
    });
  });

  describe('Test warn log...', () => {
    it('with logTransform...', () => {
      loggerWithFormat.warn('warn log');
      expect(logFnSpy.called).to.be.true;
      expect(logTransformSpy.called).to.be.true;
    });

    it('without logTransform...', () => {
      loggerWithoutFormat.warn('warn log');
      expect(logFnSpy.called).to.be.true;
    });
  });

  describe('Test error log...', () => {
    it('with logTransform...', () => {
      loggerWithFormat.error('error log');
      expect(logFnSpy.called).to.be.true;
      expect(logTransformSpy.called).to.be.true;
    });

    it('without logTransform...', () => {
      loggerWithoutFormat.error('error log');
      expect(logFnSpy.called).to.be.true;
    });
  });
});
