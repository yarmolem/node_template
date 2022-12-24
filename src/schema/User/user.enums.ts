import { registerEnumType } from 'type-graphql'

export enum UserRols {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR'
}

registerEnumType(UserRols, { name: 'UserRols' })
