import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

import config from './config'
import { UserSchema } from './schema/User/user.schema'
import { PostSchema } from './schema/Post/post.schema'

const client = postgres(config.db.url)

export const db = drizzle(client, {
  logger: true,
  schema: {
    users: UserSchema,
    posts: PostSchema
  }
})
