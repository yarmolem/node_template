import type * as t from './dto'
import { prisma } from '@src/data-source'

export const UserRepository = {
  getAllUsers: async ({ page, pageSize, skip, take }: t.GetAllUsersArgs): Promise<t.GetAllUsersResponse> => {
    const [count, users] = await prisma.$transaction([
      prisma.user.count(),
      prisma.user.findMany({
        skip,
        take,
        include: { posts: true }
      })
    ])

    return { data: users, page, pageSize, totalItems: count }
  }
}
