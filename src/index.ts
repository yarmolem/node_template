import 'dotenv/config'
import 'reflect-metadata'
import 'module-alias/register'

import Server from './server'

const main = async () => {
  const server = new Server()
  await server.start()
}

main()
