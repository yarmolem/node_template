import type * as t from './types'
import AppDataSource from '@src/data-source'
import { UserModel } from './user.model'
import { PostModel } from '../Post/post.model'

export const UserRepository = AppDataSource.getRepository(UserModel).extend({
  async getAllUsers({ page, pageSize, skip, take }: t.GetAllUsersArgs): Promise<t.GetAllUsersResponse> {
    const [data, totalItems] = await this.createQueryBuilder('user')
      .leftJoinAndMapMany('user.posts', PostModel, 'post', 'post.userId = user.id')
      .skip(skip)
      .take(take)
      .getManyAndCount()

    return { data: data as t.GetAllUsersData[], page, pageSize, totalItems }
  }
})
