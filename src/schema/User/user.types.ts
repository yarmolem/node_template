import { ArgsType, Field, ID, InputType, ObjectType } from 'type-graphql'

import User from './user.model'
import { PaginatedArgs, PaginatedResponse, withErrorsResponse } from '@src/generic-types'
import Post from '../Post/post.model'

@ArgsType()
export class GetAllUsersArgs extends PaginatedArgs {}

@ObjectType()
export class GetAllUsersData extends User {
  @Field(() => [Post])
  posts: Post[]
}

@ObjectType()
export class GetAllUsersResponse extends PaginatedResponse(GetAllUsersData) {}

@ObjectType()
export class CreateUsersResponse extends withErrorsResponse(User) {}

@InputType()
export class CreateUsersInput implements Partial<User> {
  @Field()
  name: string

  @Field()
  email: string

  @Field()
  lastname: string

  @Field()
  password: string
}

@ObjectType()
export class UpdateUsersResponse extends withErrorsResponse(User) {}

@InputType()
export class UpdateUsersInput implements Partial<User> {
  @Field(() => ID)
  id: number

  @Field()
  name: string

  @Field()
  email: string

  @Field()
  lastname: string

  @Field()
  password: string
}
