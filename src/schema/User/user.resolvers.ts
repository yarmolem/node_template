import { Resolver, Query, Args, Arg, ID, Mutation } from 'type-graphql'

import User from './user.model'
import * as t from './user.types'
import { UserRepository } from './user.repository'

import { setError } from '@src/utils/setError'

@Resolver(User)
export default class UserResolvers {
  repository = UserRepository

  @Query(() => t.GetAllUsersResponse)
  async getAllUsers(@Args() args: t.GetAllUsersArgs) {
    return this.repository.getAllUsers(args)
  }

  @Query(() => User, { nullable: true })
  async getUserById(@Arg('id', () => ID) id: number): Promise<User | null> {
    return this.repository.findOneBy({ id })
  }

  @Mutation(() => t.CreateUsersResponse, { nullable: true })
  async createUser(@Arg('input') input: t.CreateUsersInput): Promise<t.CreateUsersResponse> {
    const user = await this.repository.createQueryBuilder('user').insert().values(input).returning('*').execute()
    return { data: user.generatedMaps[0] as User }
  }

  @Mutation(() => t.UpdateUsersResponse, { nullable: true })
  async updateUser(@Arg('input') input: t.UpdateUsersInput): Promise<t.UpdateUsersResponse> {
    const { id, ...rest } = input
    const post = await this.repository.findOneBy({ id })
    if (!post) return setError('id', `No existe usuario con el ${id}`)

    await this.repository.update(id, rest)

    return { data: { ...post, ...input } }
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: number): Promise<boolean> {
    await this.repository.delete(id)
    return true
  }
}
