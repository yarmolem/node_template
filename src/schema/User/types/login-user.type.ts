import { Field, InputType, ObjectType } from 'type-graphql'

import { UserModel } from '../user.model'
import { withErrorsResponse } from '@src/generic-types'

@ObjectType()
export class LoginResponse extends withErrorsResponse(UserModel) {}

@InputType()
export class LoginInput {
  @Field()
  email: string

  @Field()
  password: string
}
