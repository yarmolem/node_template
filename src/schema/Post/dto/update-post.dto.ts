import { Field, ID, InputType, ObjectType } from 'type-graphql'

import Post from '../post.model'
import { CreatePostInput } from './create-post.dto'
import { withErrorsResponse } from '@src/generic-types'

@ObjectType()
export class UpdatePostResponse extends withErrorsResponse(Post) {}

@InputType()
export class UpdatePostInput extends CreatePostInput {
  @Field(() => ID)
  id: number
}
