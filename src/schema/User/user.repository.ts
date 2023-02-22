import User from './user.model'

import * as t from './dto'
import Post from '../Post/post.model'
import AppDataSource from '@src/data-source'

export const UserRepository = AppDataSource.getRepository(User).extend({
  async getAllUsers({ page, pageSize, skip, take }: t.GetAllUsersArgs): Promise<t.GetAllUsersResponse> {
    const [data, totalItems] = await this.createQueryBuilder('user')
      .leftJoinAndMapMany('user.posts', Post, 'post', 'post.userId = user.id')
      .skip(skip)
      .take(take)
      .getManyAndCount()

    return { data: data as t.GetAllUsersData[], page, pageSize, totalItems }
  }
})
