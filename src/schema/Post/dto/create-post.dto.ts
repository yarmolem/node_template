import { Field, InputType, Int, ObjectType } from 'type-graphql'

import { PostModel } from '../post.model'
import { withErrorsResponse } from '@src/generic-types'

@ObjectType()
export class CreatePostResponse extends withErrorsResponse(PostModel) {}

@InputType()
export class CreatePostInput {
  @Field()
  title: string

  @Field()
  content: string

  @Field(() => Int)
  userId: number
}
