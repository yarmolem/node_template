import argon2 from 'argon2'
import { Query, Arg, Mutation, Int, Args, Resolver, Authorized, Ctx, FieldResolver, Root } from 'type-graphql'

import * as t from './dto'
import User from './user.model'
import { UserRole } from './user.enums'
import { ApolloCtx } from '@src/interface'
import { UNKNOWN_ERROR } from '@src/contants'
import { setError } from '@src/utils/setError'
import { UserRepository } from './user.repository'
import TokenManager from '@src/utils/TokenManager'

@Resolver(User)
export default class UserResolvers {
  repository = UserRepository

  @FieldResolver(() => String)
  fullname(@Root() user: User): String {
    return `${user.name} ${user.lastname}`
  }

  @Authorized([UserRole.ADMIN])
  @Query(() => t.GetAllUsersResponse)
  async getAllUsers(@Args() args: t.GetAllUsersArgs): Promise<t.GetAllUsersResponse> {
    return this.repository.getAllUsers(args)
  }

  @Authorized([UserRole.ADMIN])
  @Query(() => User, { nullable: true })
  async getUserById(@Arg('id', () => Int) id: number): Promise<User | null> {
    return this.repository.findOneBy({ id })
  }

  @Authorized([UserRole.ADMIN])
  @Mutation(() => t.CreateUsersResponse)
  async createUser(@Arg('input') input: t.CreateUsersInput): Promise<t.CreateUsersResponse> {
    try {
      const user = await this.repository.findOneBy({ email: input.email })
      if (user) return setError('email', 'El correo ya se encuentra en uso')

      const hashPassword = await argon2.hash(input.password)

      const newUser = this.repository.create(input)
      newUser.password = hashPassword

      return { data: await this.repository.save(newUser) }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  }

  @Authorized([UserRole.ADMIN])
  @Mutation(() => t.UpdateUsersResponse)
  async updateUser(@Arg('input') input: t.UpdateUsersInput): Promise<t.UpdateUsersResponse> {
    try {
      const { id } = input
      const user = await this.repository.findOneBy({ id })
      if (!user) return setError('id', `No existe usuario con el ${id}`)

      await this.repository.save(input)

      return { data: { ...user, ...input } }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  }

  @Authorized([UserRole.ADMIN])
  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: number): Promise<boolean> {
    try {
      await this.repository.delete(id)
      return true
    } catch (error) {
      console.log({ error })
      return false
    }
  }

  @Mutation(() => t.LoginUserResponse)
  async loginUser(@Arg('input') input: t.LoginUserInput): Promise<t.LoginUserResponse> {
    try {
      const user = await this.repository.findOneBy({ email: input.email })
      if (!user) return setError('email', 'El email o la contraseña son inválidos')

      const isValidPass = await argon2.verify(user.password, input.password)
      if (!isValidPass) return setError('email', 'El email o la contraseña son inválidos')

      const token = TokenManager.user.sign({ id: user.id })

      return { data: { user, token } }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  }

  @Authorized()
  @Mutation(() => t.RefreshTokenUserResponse)
  async refreshTokenUser(@Ctx() { req }: ApolloCtx): Promise<t.RefreshTokenUserResponse> {
    const user = req.user!
    const token = TokenManager.user.sign({ id: user.id })

    return { data: { user, token } }
  }
}
