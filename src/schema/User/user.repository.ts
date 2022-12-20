import { AppDataSource } from '@src/db'
import Post from '../Post/post.model'

import User from './user.model'
import { GetAllUsersArgs, GetAllUsersData, GetAllUsersResponse } from './user.types'

export const UserRepository = AppDataSource.getRepository(User).extend({
  async getAllUsers({ page, pageSize }: GetAllUsersArgs): Promise<GetAllUsersResponse> {
    const [data, totalItems] = (await this.createQueryBuilder('user')
      .leftJoinAndMapMany('user.posts', Post, 'post', 'post.userId = user.id')
      .skip(page === 1 ? 0 : pageSize * (page - 1))
      .take(pageSize)
      .getManyAndCount()) as [GetAllUsersData[], number]

    return { data, page, pageSize, totalItems }
  }
})
