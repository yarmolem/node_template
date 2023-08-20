import { Field, InputType, ObjectType } from 'type-graphql'

import { UserRole } from '../user.enums'
import { UserModel } from '../user.model'
import { withErrorsResponse } from '@src/generic-types'

import type { User } from '../user.interface'

type CreateUsers = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

@ObjectType()
export class CreateUsersResponse extends withErrorsResponse(UserModel) {}

@InputType()
export class CreateUsersInput implements CreateUsers {
  @Field()
  name: string

  @Field()
  email: string

  @Field()
  lastname: string

  @Field()
  password: string

  @Field(() => UserRole)
  rol: UserRole
}
