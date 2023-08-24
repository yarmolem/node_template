import { Field, InputType, ObjectType } from 'type-graphql'

import { PostModel } from '../post.model'
import { withErrorsResponse } from '@src/generic-types'

import type { Post } from '../post.interface'

type CreatePost = Omit<Post, 'id' | 'userId' | 'createdAt' | 'updatedAt'>

@ObjectType()
export class CreatePostResponse extends withErrorsResponse(PostModel) {}

@InputType()
export class CreatePostInput implements CreatePost {
  @Field()
  title: string

  @Field()
  content: string
}
