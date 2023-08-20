import cors from 'cors'
import { json } from 'body-parser'
import { createServer } from 'node:http'
import express, { type Express } from 'express'

import Database from './db'
import Apollo from './apollo'
import config from './config'
import logger from './utils/logger'
import AppError from './utils/app-error'

import type { HTTPServer } from './interface'

class Server {
  app: Express
  db: Database
  apollo: Apollo
  httpServer: HTTPServer
  port = config.server.port

  constructor() {
    this.db = new Database()
    this.app = express()
    this.httpServer = createServer(this.app)
    this.apollo = new Apollo(this.httpServer)
  }

  async start() {
    try {
      // DB connection
      await this.db.connect()

      // Start Apollo
      const apolloMiddleware = await this.apollo.start()
      this.app.use('/graphql', cors(), json(), apolloMiddleware)

      // Start Server
      await new Promise((resolve) => {
        this.app.listen(this.port, () => {
          resolve(true)
        })
      })

      logger.info(`Server started on http://localhost:${this.port}/graphql`)
    } catch (e: unknown) {
      const error = e as Error

      if (error instanceof AppError) {
        logger.error(`[SERVER]: ${error.message}`)
      }
    }
  }
}

export default Server
