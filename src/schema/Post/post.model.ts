import { Field, ObjectType, Int } from 'type-graphql'
import { type Post } from './post.schema'

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
