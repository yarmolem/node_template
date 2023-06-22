import { Field, InputType, Int, ObjectType } from 'type-graphql'

import Post from '../post.model'
import { withErrorsResponse } from '@src/generic-types'
import { type NewPost } from '../post.schema'

@ObjectType()
export class CreatePostResponse extends withErrorsResponse(Post) {}

@InputType()
export class CreatePostInput implements NewPost {
  @Field()
  title: string

  @Field()
  content: string

  @Field(() => Int)
  authorId: number
}
