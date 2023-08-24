import argon2 from 'argon2'

import type * as t from './types'
import { UserModel } from './user.model'
import { PostModel } from '../Post/post.model'
import { UNKNOWN_ERROR } from '@src/constants'
import { setError } from '@src/utils/set-error'

import AppDataSource from '@src/data-source'

export const UserRepository = AppDataSource.getRepository(UserModel).extend({
  async getAllUsers({ page, pageSize, skip, take }: t.GetAllUsersArgs): Promise<t.GetAllUsersResponse> {
    const [data, totalItems] = await this.createQueryBuilder('user')
      .leftJoinAndMapMany('user.posts', PostModel, 'post', 'post.userId = user.id')
      .skip(skip)
      .take(take)
      .getManyAndCount()

    return { data: data as t.GetAllUsersData[], page, pageSize, totalItems }
  },
  async createUser(input: t.CreateUserInput): Promise<t.CreateUserResponse> {
    try {
      const user = await this.findOneBy({ email: input.email })
      if (user !== null) return setError('email', 'El correo ya se encuentra en uso')

      const hashPassword = await argon2.hash(input.password)

      const newUser = this.create(input)
      newUser.password = hashPassword

      return { data: await this.save(newUser) }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  },
  async updateUser(input: t.UpdateUserInput): Promise<t.UpdateUserResponse> {
    try {
      const { id } = input
      const user = await this.findOneBy({ id })
      if (user === null) return setError('id', `No existe usuario con el ${id}`)

      await this.save(input)

      return { data: { ...user, ...input } }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  }
})
