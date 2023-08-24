import { Field, InputType, ObjectType } from 'type-graphql'

import { UserModel } from '../user.model'
import { withErrorsResponse } from '@src/generic-types'

import type { User } from '../user.interface'

@ObjectType()
export class LoginResponse extends withErrorsResponse(UserModel) {}

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  email: string

  @Field()
  password: string
}
