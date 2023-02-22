import { ArgsType, Field, ObjectType } from 'type-graphql'

import PostModel from '../post.model'
import UserModel from '@src/schema/User/user.model'
import { PaginatedArgs, PaginatedResponse } from '@src/generic-types'

@ArgsType()
export class GetAllPostArgs extends PaginatedArgs {}

@ObjectType()
export class GetAllPostData extends PostModel {
  @Field(() => UserModel)
  author: UserModel
}

@ObjectType()
export class GetAllPostResponse extends PaginatedResponse(GetAllPostData) {}
