import { eq, sql } from 'drizzle-orm'

import type * as t from './dto'
import { db } from '@src/data-source'
import PostSchema from './post.schema'
import UserSchema from '../User/user.schema'

export const PostRepository = {
  getAllPost: async ({ page, pageSize, skip, take }: t.GetAllPostArgs): Promise<t.GetAllPostResponse> => {
    const [data, [{ count }]] = await Promise.all([
      db
        .select({
          id: PostSchema.id,
          title: PostSchema.title,
          content: PostSchema.content,
          authorId: PostSchema.authorId,
          createdAt: PostSchema.createdAt,
          updatedAt: PostSchema.updatedAt,
          author: UserSchema
        })
        .from(PostSchema)
        .innerJoin(UserSchema, eq(UserSchema.id, PostSchema.authorId))
        .limit(take)
        .offset(skip),
      db.select({ count: sql<number>`count(*)` }).from(PostSchema)
    ])

    return { data, page, pageSize, totalItems: count }
  }
}
