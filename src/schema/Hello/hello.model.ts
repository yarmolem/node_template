import { Field, InputType, Int, ObjectType } from 'type-graphql'

@ObjectType()
export default class Hello {
  @Field(() => Int)
  id: number

  @Field()
  message: string

  @Field()
  createdAt: Date = new Date()

  @Field()
  updatedAt: Date = new Date()
}

@InputType()
export class CreateMessageInput {
  @Field()
  message: string
}
