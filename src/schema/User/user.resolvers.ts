import argon2 from 'argon2'
import { Query, Arg, Mutation, Int, Args, Resolver, Authorized, Ctx, FieldResolver, Root } from 'type-graphql'

import * as t from './types'
import { UserRole } from './user.enums'
import { UserModel } from './user.model'
import { setError } from '@src/utils/set-error'
import { UserRepository } from './user.repository'
import { COOKIE_MAX_AGE, COOKIE_NAME, UNKNOWN_ERROR } from '@src/constants'

import { ApolloCtx } from '@src/interface'
import type { User } from './user.interface'

@Resolver(UserModel)
export default class UserResolvers {
  repository = UserRepository

  @FieldResolver(() => String)
  fullname(@Root() user: UserModel): string {
    return `${user.name} ${user.lastname}`
  }

  @Authorized(UserRole.ADMIN)
  @Query(() => t.GetAllUsersResponse)
  async getAllUsers(@Args() args: t.GetAllUsersArgs): Promise<t.GetAllUsersResponse> {
    return await this.repository.getAllUsers(args)
  }

  @Authorized(UserRole.ADMIN)
  @Query(() => UserModel, { nullable: true })
  async getUserById(@Arg('id', () => Int) id: number): Promise<User | null> {
    return await this.repository.findOneBy({ id })
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => t.CreateUserResponse)
  async createUser(@Arg('input') input: t.CreateUserInput): Promise<t.CreateUserResponse> {
    return await this.repository.createUser(input)
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => t.UpdateUserResponse)
  async updateUser(@Arg('input') input: t.UpdateUserInput): Promise<t.UpdateUserResponse> {
    return await this.repository.updateUser(input)
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: number): Promise<boolean> {
    return await this.repository
      .delete(id)
      .then(() => true)
      .catch(() => false)
  }

  @Query(() => UserModel, { nullable: true })
  async me(@Ctx() { req }: ApolloCtx): Promise<User | null> {
    if (req.session?.userId === undefined) return null

    const day = COOKIE_MAX_AGE
    req.session.cookie.expires = new Date(Date.now() + day)
    req.session.cookie.maxAge = day

    return await this.repository.findOneBy({ id: req.session.userId })
  }

  @Mutation(() => t.LoginResponse)
  async login(@Ctx() { req }: ApolloCtx, @Arg('input') input: t.LoginInput): Promise<t.LoginResponse> {
    try {
      const user = await this.repository.findOneBy({ email: input.email })
      if (user === null) return setError('email', 'El email o la contraseña son inválidos')

      const isValidPass = await argon2.verify(user.password, input.password)
      if (!isValidPass) return setError('email', 'El email o la contraseña son inválidos')

      req.session.userId = user.id

      return { data: user }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: ApolloCtx): Promise<boolean> {
    return await new Promise((resolve) => {
      req.session.destroy((err) => {
        if (typeof err !== 'undefined') {
          resolve(false)
          return
        }

        res.clearCookie(COOKIE_NAME)
        resolve(true)
      })
    })
  }
}
