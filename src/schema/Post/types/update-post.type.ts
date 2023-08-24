import { Field, InputType, Int, ObjectType } from 'type-graphql'

import { PostModel } from '../post.model'
import { withErrorsResponse } from '@src/generic-types'

import type { Post } from '../post.interface'

type UpdatePost = Omit<Post, 'userId' | 'createdAt' | 'updatedAt'>

@ObjectType()
export class UpdatePostResponse extends withErrorsResponse(PostModel) {}

@InputType()
export class UpdatePostInput implements UpdatePost {
  @Field(() => Int)
  id: number

  @Field()
  title: string

  @Field()
  content: string
}
