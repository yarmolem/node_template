import argon2 from 'argon2'
import { eq } from 'drizzle-orm'
import { Query, Arg, Mutation, Int, Args, Resolver, Authorized, Ctx, FieldResolver, Root } from 'type-graphql'

import * as t from './dto'
import UserModel from './user.model'
import UserSchema, { Role } from './user.schema'
import { db } from '@src/data-source'
import { ApolloCtx } from '@src/interface'
import { UNKNOWN_ERROR } from '@src/contants'
import { setError } from '@src/utils/setError'
import { UserRepository } from './user.repository'
import TokenManager from '@src/utils/TokenManager'

@Resolver(UserModel)
export default class UserResolvers {
  @FieldResolver(() => String)
  fullname(@Root() user: UserModel): string {
    return `${user.name} ${user.lastname}`
  }

  @Authorized([Role.ADMIN, Role.USER])
  @Query(() => t.GetAllUsersResponse)
  async getAllUsers(@Args() args: t.GetAllUsersArgs): Promise<t.GetAllUsersResponse> {
    return await UserRepository.getAllUsers(args)
  }

  @Authorized([Role.ADMIN])
  @Query(() => UserModel, { nullable: true })
  async getUserById(@Arg('id', () => Int) id: number): Promise<UserModel | undefined> {
    return await db.query.users.findFirst({ where: eq(UserSchema.id, id) })
  }

  // @Authorized([Role.ADMIN])
  @Mutation(() => t.CreateUsersResponse)
  async createUser(@Arg('input') input: t.CreateUsersInput): Promise<t.CreateUsersResponse> {
    // const parsed = await t.CreateUsersInput.validate(input)
    // if (!parsed.ok) return { errors: parsed.errors }

    try {
      const user = await db.query.users.findFirst({ where: eq(UserSchema.email, input.email) })
      if (user !== undefined) return setError('email', 'El correo ya se encuentra en uso')

      const hashPassword = await argon2.hash(input.password)
      input.password = hashPassword

      const newUser = await db.insert(UserSchema).values(input).returning()

      return { data: newUser?.[0] }
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
      const user = await db.query.users.findFirst({ where: eq(UserSchema.id, id) })
      if (user === undefined) return setError('id', `No existe usuario con el ${id}`)

      const updatedUser = await db.update(UserSchema).set(input).where(eq(UserSchema.id, id)).returning()

      return { data: updatedUser?.[0] }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  }

  @Authorized([Role.ADMIN])
  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: number): Promise<boolean> {
    try {
      await db.delete(UserSchema).where(eq(UserSchema.id, id))
      return true
    } catch (error) {
      console.log({ error })
      return false
    }
  }

  @Mutation(() => t.LoginUserResponse)
  async loginUser(@Arg('input') input: t.LoginUserInput): Promise<t.LoginUserResponse> {
    try {
      const user = await db.query.users.findFirst({ where: eq(UserSchema.email, input.email) })
      if (user === undefined) return setError('email', 'El email o la contraseña son inválidos')

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
    const user = req.user
    if (typeof user === 'undefined') return setError('authorization', 'Token invalido')
    const token = TokenManager.user.sign({ id: user.id })

    return { data: { user, token } }
  }
}
