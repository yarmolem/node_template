import TokenManager from './TokenManager'
import { prisma } from '@src/data-source'

import { type ApolloCtx } from '@src/interface'
import { type AuthChecker } from 'type-graphql'

export const authChecker: AuthChecker<ApolloCtx> = async ({ context }, roles) => {
  const token = context.req?.headers?.authorization ?? null
  if (token === null || (token !== null && !token.includes('Bearer '))) return false

  const payload = TokenManager.user.verify(token.replace('Bearer ', ''))
  if (typeof payload?.id !== 'number') return false

  const user = await prisma.user.findUnique({ where: { id: payload.id } })
  if (user === null) return false

  context.req.user = user

  return roles.length === 0 || roles.includes(user.rol)
}
