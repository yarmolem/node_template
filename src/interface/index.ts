import { Request, Response } from 'express'
import User from '@src/schema/User/user.model'

export interface ApolloCtx {
  req: Request & { user?: User }
  res: Response
}
