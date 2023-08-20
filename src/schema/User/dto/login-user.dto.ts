import { Field, InputType, ObjectType } from 'type-graphql'

import { UserModel } from '../user.model'
import { User } from '../user.interface'
import { withErrorsResponse } from '@src/generic-types'

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
