import { ArgsType, ObjectType } from 'type-graphql'

import { PostModel } from '../post.model'
import { PaginatedArgs, PaginatedResponse } from '@src/generic-types'

@ArgsType()
export class GetAllPostArgs extends PaginatedArgs {}

@ObjectType()
export class GetAllPostResponse extends PaginatedResponse(PostModel) {}
