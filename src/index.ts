import 'dotenv/config'
import 'module-alias/register'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import logger from './utils/logger'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('America/Lima')

const now = dayjs().format('YYYY-MM-DD hh:mm:ss')

const main = async () => {
  const { default: Server } = await import('./server')
  const server = new Server()
  await server.start()
}

main()
  .then(() => {
    logger.info(`Server started at ${now}`)
  })
  .catch((error) => {
    console.error(error)
    logger.info(`Error starting server at ${now}`)
  })
