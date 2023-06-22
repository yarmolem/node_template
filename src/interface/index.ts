import type { Request, Response } from 'express'
import { type User } from '@src/schema/User/user.schema'

export interface ApolloCtx {
  req: Request & { user?: User }
  res: Response
}
