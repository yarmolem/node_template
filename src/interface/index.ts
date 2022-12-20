import { Request, Response } from 'express'

export interface ApolloCtx {
  req: Request & { userId?: number }
  res: Response
}
