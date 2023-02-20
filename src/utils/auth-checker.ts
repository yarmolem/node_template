import { AuthChecker } from 'type-graphql'

import { verifyJWT } from './jwt'
import { ApolloCtx } from '@src/interface'
import { UserRepository } from '@src/schema/User/user.repository'

export const authChecker: AuthChecker<ApolloCtx> = async ({ context }, roles) => {
  const token = context.req?.headers?.authorization ?? null
  if (!token) return false

  const payload = verifyJWT(token.replace('Bearer ', ''))
  if (!payload?.id) return false

  const user = await UserRepository.findOneBy({ id: payload.id })
  if (!user) return false

  context.req.user = user

  return roles.length === 0 || roles.includes(user.rol)
}
