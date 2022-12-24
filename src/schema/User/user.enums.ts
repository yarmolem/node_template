import { registerEnumType } from 'type-graphql'

export enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR'
}

registerEnumType(UserRoles, { name: 'UserRoles' })
