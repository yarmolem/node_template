import User from './user.model'

import Post from '../Post/post.model'
import AppDataSource from '@src/data-source'
import { GetAllUsersArgs, GetAllUsersData, GetAllUsersResponse } from './dto'

export const UserRepository = AppDataSource.getRepository(User).extend({
  async getAllUsers({ page, pageSize, skip, take }: GetAllUsersArgs): Promise<GetAllUsersResponse> {
    const [data, totalItems] = await this.createQueryBuilder('user')
      .leftJoinAndMapMany('user.posts', Post, 'post', 'post.userId = user.id')
      .skip(skip)
      .take(take)
      .getManyAndCount()

    return { data: data as GetAllUsersData[], page, pageSize, totalItems }
  }
})
