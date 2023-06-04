import winston, { format } from 'winston'

export const logger = winston.createLogger({
  level: 'debug',
  format: format.combine(
    format.colorize({ all: true }),
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
    new winston.transports.File({ filename: 'autotest.log', level: 'info' }),
  ],
})

// // Redirect console.log() to Winston
// console.log = (...args: []) => {
//   logger.info(args.join(' '))
// }

// //
// // If we're not in production then log to the `console` with the format:
// // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// //
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     }),
//   )
// }
