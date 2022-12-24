import User from '@src/schema/User/user.model'
import { Request, Response } from 'express'

export interface ApolloCtx {
  req: Request & { user?: User }
  res: Response
}
