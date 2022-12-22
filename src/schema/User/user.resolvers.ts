import { Query, Arg, Mutation, Int, Args, Resolver } from 'type-graphql'

import User from './user.model'
import * as t from './user.types'
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

  @Mutation(() => t.CreateUsersResponse, { nullable: true })
  async createUser(@Arg('input') input: t.CreateUsersInput): Promise<t.CreateUsersResponse> {
    const user = this.repository.create(input)
    return { data: await this.repository.save(user) }
  }

  @Mutation(() => t.UpdateUsersResponse, { nullable: true })
  async updateUser(@Arg('input') input: t.UpdateUsersInput): Promise<t.UpdateUsersResponse> {
    const { id } = input
    const user = await this.repository.findOneBy({ id })
    if (!user) return setError('id', `No existe usuario con el ${id}`)

    const savedUser = await this.repository.save(input)
    return { data: { ...savedUser, createdAt: user.createdAt } }
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: number): Promise<boolean> {
    await this.repository.delete(id)
    return true
  }
}
