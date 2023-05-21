import winston from 'winston'
import TzDate from './TzDate'

function timezoned(): string {
  return new TzDate().lima?.format('YYYY-MM-DD HH:mm:ss') ?? ''
}

const logger: winston.Logger = winston.createLogger({
  level: 'silly',
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: timezoned }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'logs/info.log'
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'logs/error.log'
    }),
    new winston.transports.Console({
      format: winston.format.combine(winston.format.cli(), winston.format.splat())
    })
  ]
})

export default logger
