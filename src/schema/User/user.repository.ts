import User from './user.model'

import Post from '../Post/post.model'
import AppDataSource from '@src/data-source'
import { GetAllUsersArgs, GetAllUsersData, GetAllUsersResponse } from './dto'

export const UserRepository = AppDataSource.getRepository(User).extend({
  async getAllUsers({ page, pageSize }: GetAllUsersArgs): Promise<GetAllUsersResponse> {
    const [data, totalItems] = await this.createQueryBuilder('user')
      .leftJoinAndMapMany('user.posts', Post, 'post', 'post.userId = user.id')
      .skip(page === 1 ? 0 : pageSize * (page - 1))
      .take(pageSize)
      .getManyAndCount()

    return { data: data as GetAllUsersData[], page, pageSize, totalItems }
  }
})
