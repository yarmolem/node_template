import { IsEmail } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

import { withErrorsResponse } from '@src/generic-types'
import UserModel from '../user.model'

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
export class LoginUserInput implements Partial<UserModel> {
  @Field()
  @IsEmail()
  email: string

  @Field()
  password: string
}
