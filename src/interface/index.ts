import type { Request, Response } from 'express'
import type { Server, IncomingMessage, ServerResponse } from 'node:http'

import type { Session } from 'express-session'
import type { User } from '@src/schema/User/user.interface'

export interface CustomRequest extends Request {
  user?: User
  session: Session & { userId?: number }
}

export interface ApolloCtx {
  res: Response
  req: CustomRequest
}

export type HTTPServer = Server<typeof IncomingMessage, typeof ServerResponse>
