import type { Request } from 'express'
import type { Server, IncomingMessage, ServerResponse } from 'node:http'

import type { User } from '@src/schema/User/user.interface'

export interface ApolloCtx {
  req: Request & { user?: User }
}

export type HTTPServer = Server<typeof IncomingMessage, typeof ServerResponse>
