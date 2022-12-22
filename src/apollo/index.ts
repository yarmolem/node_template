import { join } from 'path'
import { Express } from 'express'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'

import logger from '@src/utils/logger'
import { ApolloCtx } from '@src/interface'

class Apollo {
  apollo: ApolloServer
  private app: Express

  constructor(app: Express) {
    this.app = app
  }

  async start() {
    try {
      const schema = await buildSchema({
        validate: false,
        dateScalarMode: 'isoDate',
        resolvers: [join(__dirname, '../**/*.resolvers.ts')],
        emitSchemaFile: join(__dirname, '../../schema.graphql')
      })

      this.apollo = new ApolloServer({
        schema,
        csrfPrevention: true,
        allowBatchedHttpRequests: true,
        context: (ctx: ApolloCtx) => ctx
      })

      await this.apollo.start()
      this.apollo.applyMiddleware({ app: this.app, cors: false })
      logger.info('Apollo server started')
    } catch (error) {
      logger.error('Apollo failed to start')
      console.log(error)
    }
  }
}

export default Apollo
