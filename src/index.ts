import 'reflect-metadata'
import 'module-alias/register'
import './config'

import Server from './server'

const main = async () => {
  const server = new Server()
  await server.start()
}

main()
