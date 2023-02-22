import argon2 from 'argon2'
import { Query, Arg, Mutation, Int, Args, Resolver, Authorized, Ctx, FieldResolver, Root } from 'type-graphql'

import * as t from './dto'
import User from './user.model'
import { Role } from '.prisma/client'
import { prisma } from '@src/data-source'
import { ApolloCtx } from '@src/interface'
import { UNKNOWN_ERROR } from '@src/contants'
import { setError } from '@src/utils/setError'
import { UserRepository } from './user.repository'
import TokenManager from '@src/utils/TokenManager'

@Resolver(User)
export default class UserResolvers {
  @FieldResolver(() => String)
  fullname(@Root() user: User): String {
    return `${user.name} ${user.lastname}`
  }

  @Authorized([Role.ADMIN])
  @Query(() => t.GetAllUsersResponse)
  async getAllUsers(@Args() args: t.GetAllUsersArgs): Promise<t.GetAllUsersResponse> {
    return UserRepository.getAllUsers(args)
  }

  @Authorized([Role.ADMIN])
  @Query(() => User, { nullable: true })
  async getUserById(@Arg('id', () => Int) id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } })
  }

  @Authorized([Role.ADMIN])
  @Mutation(() => t.CreateUsersResponse)
  async createUser(@Arg('input') input: t.CreateUsersInput): Promise<t.CreateUsersResponse> {
    try {
      const user = await prisma.user.findUnique({ where: { email: input.email } })
      if (user) return setError('email', 'El correo ya se encuentra en uso')

      const hashPassword = await argon2.hash(input.password)
      input.password = hashPassword

      return { data: await prisma.user.create({ data: input }) }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  }

  @Authorized([Role.ADMIN])
  @Mutation(() => t.UpdateUsersResponse)
  async updateUser(@Arg('input') input: t.UpdateUsersInput): Promise<t.UpdateUsersResponse> {
    try {
      const { id } = input
      const user = await prisma.user.findUnique({ where: { id } })
      if (!user) return setError('id', `No existe usuario con el ${id}`)

      const updatedUser = await prisma.user.update({ where: { id }, data: input })

      return { data: updatedUser }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  }

  @Authorized([Role.ADMIN])
  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: number): Promise<boolean> {
    try {
      await prisma.user.delete({ where: { id } })
      return true
    } catch (error) {
      console.log({ error })
      return false
    }
  }

  @Mutation(() => t.LoginUserResponse)
  async loginUser(@Arg('input') input: t.LoginUserInput): Promise<t.LoginUserResponse> {
    try {
      const user = await prisma.user.findUnique({ where: { email: input.email } })
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
