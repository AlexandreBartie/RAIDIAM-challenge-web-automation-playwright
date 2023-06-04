import winston, { format } from 'winston'

import fs from 'fs'
import path from 'path'

class TestLoggerActions {
  protected logger: winston.Logger

  info(msg: string): void {
    this.logger.info(msg)
  }
  warn(msg: string) {
    this.logger.warn(msg)
  }
  error(msg: string) {
    this.logger.error(msg)
  }
  debug(msg: string) {
    this.logger.debug(msg)
  }
}

class TestLogger extends TestLoggerActions {
  protected logFile = path.join(this.logFolder(), this.logFileName())

  constructor() {
    super()
    this.logger = winston.createLogger({
      level: 'debug',
      format: format.combine(
        // format.colorize({ all: true }),
        format.timestamp({ format: 'HH:mm:ss' }),
        // format.align(),
        format.printf(
          (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
        ),
      ),
      // defaultMeta: { service: 'user-service' },
      transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.Console({
          format: format.simple(),
          level: 'debug',
        }),
        new winston.transports.File({ filename: this.logFile, level: 'info' }),
      ],
    })
  }

  private logFileName(): string {
    return `log_${new Date().toISOString().replace(/:/g, '-')}.log`
  }

  private logFolder(): string {
    const folder = './test-logs'
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    }
    return folder
  }
}

const logger = new TestLogger()

export { logger }
