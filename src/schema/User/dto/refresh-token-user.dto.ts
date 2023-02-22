import { Field, ObjectType } from 'type-graphql'

import User from '../user.model'
import { withErrorsResponse } from '@src/generic-types'

@ObjectType()
export class RefreshTokenUserData {
  @Field(() => User)
  user: User

  @Field()
  token: string
}

@ObjectType()
export class RefreshTokenUserResponse extends withErrorsResponse(RefreshTokenUserData) {}
