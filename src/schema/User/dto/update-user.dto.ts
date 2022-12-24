import { withErrorsResponse } from '@src/generic-types'
import { Field, InputType, Int, ObjectType } from 'type-graphql'

import User from '../user.model'

@ObjectType()
export class UpdateUsersResponse extends withErrorsResponse(User) {}

@InputType()
export class UpdateUsersInput implements Partial<User> {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field()
  email: string

  @Field()
  lastname: string
}
