import { PaginatedArgs, PaginatedResponse } from '@src/generic-types'
import { ArgsType, ObjectType } from 'type-graphql'
import Post from '../post.model'

@ArgsType()
export class GetAllPostArgs extends PaginatedArgs {}

@ObjectType()
export class GetAllPostResponse extends PaginatedResponse(Post) {}
