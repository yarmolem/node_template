import { Field, InputType, ObjectType } from 'type-graphql'

import { UserModel } from '../user.model'
import { withErrorsResponse } from '@src/generic-types'

import type { User } from '../user.interface'

@ObjectType()
export class LoginUserData {
  @Field(() => UserModel)
  user: UserModel

  @Field()
  token: string
}

@ObjectType()
export class LoginUserResponse extends withErrorsResponse(LoginUserData) {}

@InputType()
export class LoginUserInput implements Partial<User> {
  @Field()
  email: string

  @Field()
  password: string
}
