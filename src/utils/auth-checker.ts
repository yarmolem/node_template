import TokenManager from './TokenManager'
import { UserRepository } from '@src/schema/User/user.repository'

import type { AuthChecker } from 'type-graphql'
import type { ApolloCtx } from '@src/interface'

export const authChecker: AuthChecker<ApolloCtx> = async ({ context }, roles) => {
  const token = context.req?.headers?.authorization ?? null
  if (token === null || (token !== null && !token.includes('Bearer '))) return false

  const payload = TokenManager.user.verify(token.replace('Bearer ', ''))
  if (payload === null) return false

  const user = await UserRepository.findOneBy({ id: payload.id })
  if (user === null) return false

  context.req.user = user

  return roles.length === 0 || roles.includes(user.rol)
}
