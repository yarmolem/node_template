import 'dotenv/config'
import 'reflect-metadata'
import 'module-alias/register'

import Server from './server'
import logger from './utils/logger'
import TzDate from './utils/TzDate'

const main = async () => {
  const server = new Server()
  await server.start()
}

main()
  .then(() => logger.info(`Server started at ${new TzDate().lima?.format('DD-MM-YYYY hh:mm:ss') ?? ''}`))
  .catch(() => logger.info(`Error starting server at ${new TzDate().lima?.format('DD-MM-YYYY hh:mm:ss') ?? ''}`))
