import cors from 'cors'
import express, { type Express } from 'express'

import config from './config'
import RootRouter from './router'
import logger from './utils/logger'
import { connect } from './data-source'

class Server {
  app: Express
  port = config.port

  constructor() {
    this.app = express()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  routes() {
    this.app.use('/api', RootRouter)
  }

  async start() {
    // DB connection
    await connect()

    // Start middlewares
    this.middlewares()

    // Start routes
    this.routes()

    // Start Server
    await new Promise<boolean>((resolve) => {
      this.app.listen(this.port, () => {
        logger.info(`Started server on http://localhost:${this.port}`)
        resolve(true)
      })
    })
  }
}

export default Server
