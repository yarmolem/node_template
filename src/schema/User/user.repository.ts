import { sql } from 'drizzle-orm'

import type * as t from './dto'
import { db } from '@src/data-source'
import { UserSchema } from './user.schema'

export const UserRepository = {
  getAllUsers: async ({ page, pageSize, skip, take }: t.GetAllUsersArgs): Promise<t.GetAllUsersResponse> => {
    const [data, [{ count }]] = await Promise.all([
      db.select().from(UserSchema).limit(take).offset(skip),
      db.select({ count: sql<number>`count(*)` }).from(UserSchema)
    ])

    return { data, page, pageSize, totalItems: count }
  }
}
