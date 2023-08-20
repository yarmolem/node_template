import 'reflect-metadata'
import 'module-alias/register'
import './config'

import Server from './server'
import logger from './utils/logger'

const main = async () => {
  const server = new Server()
  await server.start()
}

const now = new Date().toISOString()

main()
  .then(() => logger.info(`Server started at ${now}`))
  .catch(() => logger.info(`Error starting server at ${now}`))
