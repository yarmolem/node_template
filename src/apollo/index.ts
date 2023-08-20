import { buildSchema } from 'type-graphql'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

import logger from '@src/utils/logger'
import { authChecker } from '@src/utils/auth-checker'

import UserResolvers from '@src/schema/User/user.resolvers'
import PostResolvers from '@src/schema/Post/post.resolvers'
import HelloResolvers from '@src/schema/Hello/hello.resolvers'

import type { ApolloCtx, HTTPServer } from '@src/interface'
import AppError from '@src/utils/app-error'

class Apollo {
  apollo: ApolloServer

  constructor(private httpServer: HTTPServer) {}

  async start() {
    const schema = await buildSchema({
      authChecker,
      resolvers: [HelloResolvers, UserResolvers, PostResolvers]
    })

    if (!schema) throw new AppError('Error generating apollo schema')

    const server = new ApolloServer<ApolloCtx>({
      schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer })]
    })

    if (!server) throw new AppError('Error generating apollo server')

    await server.start()

    logger.info('Apollo server started')
    return expressMiddleware(server, { context: async (ctx) => ({ req: ctx.req }) })
  }
}

export default Apollo
