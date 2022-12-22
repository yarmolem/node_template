import cors from 'cors'
import express, { Express } from 'express'

import Database from './db'
import Apollo from './apollo'
import config from './config'
import logger from './utils/logger'

class Server {
  app: Express
  db: Database
  apollo: Apollo
  port = config.port

  constructor() {
    this.app = express()
    this.db = new Database()
    this.apollo = new Apollo(this.app)
  }

  middlewares() {
    this.app.use(cors())
  }

  async start() {
    // Start middlewares
    this.middlewares()

    // DB connection
    await this.db.connect()

    // Start Apollo
    await this.apollo.start()

    // Start Server
    await new Promise((res) => this.app.listen(this.port, () => res(true)))
    logger.info(`Started server on http://localhost:${this.port}/graphql`)
  }
}

export default Server
