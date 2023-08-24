import { Field, InputType, ObjectType } from 'type-graphql'

import { UserRole } from '../user.enums'
import { UserModel } from '../user.model'
import { withErrorsResponse } from '@src/generic-types'

import type { User } from '../user.interface'

type CreateUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

@ObjectType()
export class CreateUserResponse extends withErrorsResponse(UserModel) {}

@InputType()
export class CreateUserInput implements CreateUser {
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
