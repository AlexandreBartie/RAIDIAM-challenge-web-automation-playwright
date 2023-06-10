import winston from 'winston'

class LoggerMsg {
  protected logger: winston.Logger

  info(msg: string): void {
    this.logger.info(msg)
  }

  warn(msg: string) {
    this.logger.warn(msg)
  }

  error(msg: string, err?: Error) {
    let msgError = msg

    if (err) msgError += ` [${err.name}] ${err.message}`

    this.logger.error(msgError)
  }

  debug(msg: string) {
    this.logger.debug(msg)
  }
}

export class LoggerActions extends LoggerMsg {
  private sizeTrace = 35

  trace(msg: string, trace = '-'): void {
    this.logger.info(trace.repeat(this.sizeTrace))
    this.info(msg)
  }
}
