import { Router } from 'express'
import { orm } from '@src/data-source'

const RootRouter = Router()

RootRouter.get('/', async (_req, res) => {
  const users = await orm.query.users.findMany()

  res.json({
    ok: true,
    message: 'Successfully',
    data: users
  })
})

export default RootRouter
