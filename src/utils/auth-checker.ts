import { AuthChecker } from 'type-graphql'

import TokenManager from './TokenManager'
import { ApolloCtx } from '@src/interface'
import { prisma } from '@src/data-source'

export const authChecker: AuthChecker<ApolloCtx> = async ({ context }, roles) => {
  const token = context.req?.headers?.authorization ?? null
  if (!token || (token && !token.includes('Bearer '))) return false

  const payload = TokenManager.user.verify(token.replace('Bearer ', ''))
  if (!payload?.id) return false

  const user = await prisma.user.findUnique({ where: { id: payload.id } })
  if (!user) return false

  context.req.user = user

  return roles.length === 0 || roles.includes(user.rol)
}
