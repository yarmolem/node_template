import { Max, Min } from 'class-validator'
import { ArgsType, ClassType, Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export default class FieldError {
  @Field()
  field: string

  @Field()
  message: string
}

@ArgsType()
export class PaginatedArgs {
  @Min(1)
  @Field(() => Int)
  page: number

  @Min(1)
  @Max(50)
  @Field(() => Int)
  pageSize: number
}

export function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass])
    data: TItem[]

    @Field(() => Int)
    page: number

    @Field(() => Int)
    pageSize: number

    @Field(() => Int)
    totalItems: number
  }
  return PaginatedResponseClass
}

export function withErrorsResponse<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType({ isAbstract: true })
  abstract class withErrorsResponseClass {
    @Field(() => TItemClass, { nullable: true })
    data?: TItem | undefined

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]
  }
  return withErrorsResponseClass
}
