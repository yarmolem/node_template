import { IsEmail } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

import User from '../user.model'
import IUser from '../user.interface'
import { withErrorsResponse } from '@src/generic-types'

@ObjectType()
export class LoginUserData {
  @Field(() => User)
  user: User

  @Field()
  token: string
}

@ObjectType()
export class LoginUserResponse extends withErrorsResponse(LoginUserData) {}

@InputType()
export class LoginUserInput implements Partial<IUser> {
  @Field()
  @IsEmail()
  email: string

  @Field()
  password: string
}
