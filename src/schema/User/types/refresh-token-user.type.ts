import { Field, ObjectType } from 'type-graphql'

import { UserModel } from '../user.model'
import { withErrorsResponse } from '@src/generic-types'

@ObjectType()
export class RefreshTokenUserData {
  @Field(() => UserModel)
  user: UserModel

  @Field()
  token: string
}

@ObjectType()
export class RefreshTokenUserResponse extends withErrorsResponse(RefreshTokenUserData) {}
