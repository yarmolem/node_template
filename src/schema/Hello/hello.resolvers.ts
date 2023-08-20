import { Arg, Mutation, Query, Resolver } from 'type-graphql'

import Hello, { CreateMessageInput } from './hello.model'

@Resolver(Hello)
export default class HelloResolvers {
  messages: string[] = []

  @Query(() => String)
  hello(): string {
    return 'Its Working'
  }

  @Query(() => [String])
  getMessages(): string[] {
    return this.messages
  }

  @Mutation(() => String)
  createMessage(@Arg('input') input: CreateMessageInput): string {
    this.messages.push(input.message)
    return input.message
  }
}
