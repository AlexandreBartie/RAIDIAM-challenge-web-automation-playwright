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
  action(name: string, msg: string): void {
    this.info(`Element [${name}] ${msg}`)
  }

  trace(msg: string, trace = '-'): void {
    this.logger.info(trace.repeat(20))
    this.info(msg)
  }
}
