import { ArgsType, Field, Int, ObjectType, type ClassType } from 'type-graphql'

@ObjectType()
export default class FieldError {
  @Field()
  field: string

  @Field()
  message: string
}

@ArgsType()
export class PaginatedArgs {
  @Field(() => Int, { defaultValue: 1 })
  page: number = 1

  @Field(() => Int, { defaultValue: 10 })
  pageSize: number = 10

  get skip(): number {
    return this.page === 1 ? 0 : this.pageSize * (this.page - 1)
  }

  get take(): number {
    return this.pageSize
  }
}

export function PaginatedResponse<TItem extends object>(TItemClass: ClassType<TItem>) {
  @ObjectType()
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

export function withErrorsResponse<TItem extends object>(TItemClass: ClassType<TItem>) {
  @ObjectType()
  abstract class withErrorsResponseClass {
    @Field(() => TItemClass, { nullable: true })
    data?: TItem | undefined

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]
  }
  return withErrorsResponseClass
}
