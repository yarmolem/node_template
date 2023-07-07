import { pgTable, serial, timestamp, text, uniqueIndex } from 'drizzle-orm/pg-core'
import { type InferModel } from 'drizzle-orm'

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

const UserSchema = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    email: text('email').notNull(),
    name: text('name').notNull(),
    lastname: text('lastname').notNull(),
    password: text('password').notNull(),
    role: text('role', { enum: [Role.USER, Role.ADMIN] })
      .default(Role.USER)
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
  },
  (table) => ({
    emailIdx: uniqueIndex('user_email_idx').on(table.email)
  })
)

export type User = InferModel<typeof UserSchema>
export type NewUser = InferModel<typeof UserSchema, 'insert'>

export { UserSchema }
