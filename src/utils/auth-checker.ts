import { UserRepository } from '@src/schema/User/user.repository'

import type { AuthChecker } from 'type-graphql'
import type { ApolloCtx } from '@src/interface'

export const authChecker: AuthChecker<ApolloCtx> = async ({ context }, roles) => {
  const userId = context.req.session?.userId ?? null
  if (userId === null) return false

  const user = await UserRepository.findOneBy({ id: userId })
  if (user === null) return false

  context.req.user = user

  return roles.length === 0 || roles.includes(user.rol)
}
