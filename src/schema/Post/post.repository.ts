import * as t from './dto'
import { prisma } from '@src/data-source'

export const PostRepository = {
  getAllPost: async ({ page, pageSize, skip, take }: t.GetAllPostArgs): Promise<t.GetAllPostResponse> => {
    const [count, posts] = await prisma.$transaction([
      prisma.post.count(),
      prisma.post.findMany({
        skip,
        take,
        include: { author: true }
      })
    ])

    return { data: posts, page, pageSize, totalItems: count }
  }
}
