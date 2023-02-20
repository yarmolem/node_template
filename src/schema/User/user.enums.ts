import { registerEnumType } from 'type-graphql'

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR'
}

registerEnumType(UserRole, { name: 'UserRols' })
