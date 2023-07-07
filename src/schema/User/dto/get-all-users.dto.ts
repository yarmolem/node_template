import { ArgsType, ObjectType } from 'type-graphql'

import { UserModel } from '../user.model'
import { PaginatedArgs, PaginatedResponse } from '@src/generic-types'

@ArgsType()
export class GetAllUsersArgs extends PaginatedArgs {}

@ObjectType()
export class GetAllUsersData extends UserModel {
  // @Field(() => [PostModel])
  // posts: PostModel[]
}

@ObjectType()
export class GetAllUsersResponse extends PaginatedResponse(GetAllUsersData) {}
