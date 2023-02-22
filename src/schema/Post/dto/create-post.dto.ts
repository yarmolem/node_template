import { Prisma } from '@prisma/client'
import { withErrorsResponse } from '@src/generic-types'
import { Field, InputType, Int, ObjectType } from 'type-graphql'
import Post from '../post.model'

@ObjectType()
export class CreatePostResponse extends withErrorsResponse(Post) {}

@InputType()
export class CreatePostInput implements Omit<Prisma.PostCreateInput, 'author'> {
  @Field()
  title: string

  @Field()
  content: string

  @Field(() => Int)
  authorId: number
}
