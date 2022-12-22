import { ArgsType, Field, ID, InputType, Int, ObjectType } from 'type-graphql'

import Post from './post.model'
import { PaginatedArgs, PaginatedResponse, withErrorsResponse } from '@src/generic-types'

@ArgsType()
export class GetAllPostArgs extends PaginatedArgs {}

@ObjectType()
export class GetAllPostResponse extends PaginatedResponse(Post) {}

@ObjectType()
export class CreatePostResponse extends withErrorsResponse(Post) {}

@InputType()
export class CreatePostInput {
  @Field()
  title: string

  @Field()
  content: string

  @Field(() => Int)
  userId: number

  @Field(() => Int)
  categoryId: number
}

@ObjectType()
export class UpdatePostResponse extends withErrorsResponse(Post) {}

@InputType()
export class UpdatePostInput extends CreatePostInput {
  @Field(() => ID)
  id: number
}
