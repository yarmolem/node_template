import { ArgsType, Field, ID, InputType, ObjectType } from 'type-graphql'

import PostCategory from './post-category.model'
import { PaginatedArgs, PaginatedResponse, withErrorsResponse } from '@src/generic-types'

@ArgsType()
export class GetAllPostCategoryArgs extends PaginatedArgs {}

@ObjectType()
export class GetAllPostCategoryResponse extends PaginatedResponse(PostCategory) {}

@ObjectType()
export class CreatePostCategoryResponse extends withErrorsResponse(PostCategory) {}

@InputType()
export class CreatePostCategoryInput {
  @Field()
  name: string
}

@ObjectType()
export class UpdatePostCategoryResponse extends withErrorsResponse(PostCategory) {}

@InputType()
export class UpdatePostCategoryInput extends CreatePostCategoryInput {
  @Field(() => ID)
  id: number
}
