import { Field, InputType, ObjectType } from 'type-graphql'

import { UserModel } from '../user.model'
import { type NewUser, Role } from '../user.schema'
import { withErrorsResponse } from '@src/generic-types'

@ObjectType()
export class CreateUsersResponse extends withErrorsResponse(UserModel) {}

@InputType()
export class CreateUsersInput implements NewUser {
  @Field()
  name: string

  @Field()
  email: string

  @Field()
  lastname: string

  @Field()
  password: string

  @Field(() => Role)
  role: Role
}
