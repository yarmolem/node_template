import { ArgsType, Field, ID, InputType, ObjectType } from 'type-graphql'

import Category from './category.model'
import { PaginatedArgs, PaginatedResponse, withErrorsResponse } from '@src/generic-types'

@ArgsType()
export class GetAllCategoryArgs extends PaginatedArgs {}

@ObjectType()
export class GetAllCategoryResponse extends PaginatedResponse(Category) {}

@ObjectType()
export class CreateCategoryResponse extends withErrorsResponse(Category) {}

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string
}

@ObjectType()
export class UpdateCategoryResponse extends withErrorsResponse(Category) {}

@InputType()
export class UpdateCategoryInput extends CreateCategoryInput {
  @Field(() => ID)
  id: number
}
