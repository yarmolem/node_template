import { type Post } from '@prisma/client'
import { Field, ObjectType, Int } from 'type-graphql'

@ObjectType()
export default class PostModel implements Post {
  @Field(() => Int)
  id: number

  @Field()
  title: string

  @Field()
  content: string

  @Field(() => Int)
  authorId: number

  @Field()
  createdAt: Date = new Date()

  @Field()
  updatedAt: Date = new Date()
}
