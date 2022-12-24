import { Query, Arg, Mutation, Int, Args, Resolver } from 'type-graphql'

import * as t from './dto'
import User from './user.model'
import { setError } from '@src/utils/setError'
import { UserRepository } from './user.repository'

@Resolver(User)
export default class UserResolvers {
  repository = UserRepository

  @Query(() => t.GetAllUsersResponse)
  async getAllUsers(@Args() args: t.GetAllUsersArgs): Promise<t.GetAllUsersResponse> {
    return this.repository.getAllUsers(args)
  }

  @Query(() => User, { nullable: true })
  async getUserById(@Arg('id', () => Int) id: number): Promise<User | null> {
    return this.repository.findOneBy({ id })
  }

  @Mutation(() => t.CreateUsersResponse)
  async createUser(@Arg('input') input: t.CreateUsersInput): Promise<t.CreateUsersResponse> {
    const user = this.repository.create(input)
    return { data: await this.repository.save(user) }
  }

  @Mutation(() => t.UpdateUsersResponse)
  async updateUser(@Arg('input') input: t.UpdateUsersInput): Promise<t.UpdateUsersResponse> {
    const { id } = input
    const user = await this.repository.findOneBy({ id })
    if (!user) return setError('id', `No existe usuario con el ${id}`)

    await this.repository.save(input)

    return { data: { ...user, ...input } }
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: number): Promise<boolean> {
    await this.repository.delete(id)
    return true
  }
}
