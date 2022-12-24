import { ArgsType, Field, ObjectType } from 'type-graphql'
import { PaginatedArgs, PaginatedResponse } from '@src/generic-types'

import User from '../user.model'
import Post from '@src/schema/Post/post.model'

@ArgsType()
export class GetAllUsersArgs extends PaginatedArgs {}

@ObjectType()
export class GetAllUsersData extends User {
  @Field(() => [Post])
  posts: Post[]
}

@ObjectType()
export class GetAllUsersResponse extends PaginatedResponse(GetAllUsersData) {}
