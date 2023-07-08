import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { type InferModel } from 'drizzle-orm'

import { UserSchema } from '../User/user.schema'

const PostSchema = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  authorId: integer('author_id')
    .notNull()
    .references(() => UserSchema.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export type Post = InferModel<typeof PostSchema>
export type NewPost = InferModel<typeof PostSchema, 'insert'>

export { PostSchema }
