import { Field, InputType, Int, ObjectType } from 'type-graphql'

import { PostModel } from '../post.model'
import { CreatePostInput } from './create-post.dto'
import { withErrorsResponse } from '@src/generic-types'

@ObjectType()
export class UpdatePostResponse extends withErrorsResponse(PostModel) {}

@InputType()
export class UpdatePostInput extends CreatePostInput {
  @Field(() => Int)
  id: number
}
