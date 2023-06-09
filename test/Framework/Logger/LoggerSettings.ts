import winston, { format, transports } from 'winston'

import { LoggerOutput } from './LoggerOutput'

type levelType = string | undefined

export class LoggerSettings {
  private timeFormat = 'HH:mm:ss'

  private output = new LoggerOutput('./test-logs')

  newLogger(level: levelType): winston.Logger {
    return winston.createLogger({
      level: level,
      format: this.getFormat(),
      // defaultMeta: { service: 'user-service' },
      transports: [this.AddLogConsole(level), this.AddLogFile(level)],
    })
  }

  private getFormat(): winston.Logform.Format {
    return format.combine(
      format.colorize({ all: true }),
      format.timestamp({ format: this.timeFormat }),
      format.printf(
        (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
      ),
    )
  }

  private AddLogConsole(level: levelType): transports.ConsoleTransportInstance {
    const logConsole = new transports.Console({
      format: format.simple(),
      level: level,
    })
    return logConsole
  }

  private AddLogFile(level: levelType): transports.FileTransportInstance {
    const logFile = new transports.File({
      filename: this.output.logFile(),
      level: level,
    })
    return logFile
  }
}
