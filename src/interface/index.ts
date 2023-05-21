import type { Request, Response } from 'express'
import type User from '@src/schema/User/user.model'

export interface ApolloCtx {
  req: Request & { user?: User }
  res: Response
}
