import { Field, InputType, Int, ObjectType } from 'type-graphql'

import { UserRole } from '../user.enums'
import { UserModel } from '../user.model'
import { withErrorsResponse } from '@src/generic-types'

import type { User } from '../user.interface'

@ObjectType()
export class UpdateUserResponse extends withErrorsResponse(UserModel) {}

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field()
  email: string

  @Field()
  lastname: string

  @Field(() => UserRole)
  rol: UserRole
}
