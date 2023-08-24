import cors from 'cors'
import { json } from 'body-parser'
import session from 'express-session'
import { createServer } from 'node:http'
import express, { type Express } from 'express'

import Database from './db'
import Apollo from './apollo'
import config from './config'
import logger from './utils/logger'
import AppError from './utils/app-error'

import type { HTTPServer } from './interface'
import { COOKIE_MAX_AGE, COOKIE_NAME, isDev } from './constants'

class Server {
  app: Express
  db: Database
  apollo: Apollo
  httpServer: HTTPServer
  graphqlPath = '/graphql'
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

      this.app.set('trust proxy', 1)
      this.app.use(
        cors({
          credentials: true,
          origin: isDev ? ['https://sandbox.embed.apollographql.com'] : []
        })
      )

      this.app.use(
        session({
          resave: false,
          name: COOKIE_NAME,
          secret: config.session.secret,
          saveUninitialized: false,
          cookie: {
            secure: false,
            httpOnly: true,
            sameSite: 'lax',
            maxAge: COOKIE_MAX_AGE
          }
        })
      )

      this.app.use(this.graphqlPath, json(), apolloMiddleware)

      // Start Server
      await new Promise((resolve) => {
        this.app.listen(this.port, () => {
          resolve(true)
        })
      })

      logger.info(`Server started on http://localhost:${this.port}${this.graphqlPath}`)
    } catch (e: unknown) {
      const error = e as Error

      if (error instanceof AppError) {
        logger.error(`[SERVER]: ${error.message}`)
      }
    }
  }
}

export default Server
