import { ArgsType, Field, ObjectType } from 'type-graphql'

import User from '../user.model'
import Post from '@src/schema/Post/post.model'
import { PaginatedArgs, PaginatedResponse } from '@src/generic-types'

@ArgsType()
export class GetAllUsersArgs extends PaginatedArgs {}

@ObjectType()
export class GetAllUsersData extends User {
  @Field(() => [Post])
  posts: Post[]
}

@ObjectType()
export class GetAllUsersResponse extends PaginatedResponse(GetAllUsersData) {}
