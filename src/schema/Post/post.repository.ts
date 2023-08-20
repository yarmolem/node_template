import type * as t from './dto'
import { PostModel } from './post.model'
import AppDataSource from '@src/data-source'

export const PostRepository = AppDataSource.getRepository(PostModel).extend({
  async getAllPost(args: t.GetAllPostArgs, { userId }: { userId?: number }): Promise<t.GetAllPostResponse> {
    const [data, totalItems] = await this.createQueryBuilder('post')
      .where('post.userId = :userId', { userId })
      .skip(args.skip)
      .take(args.take)
      .getManyAndCount()

    return {
      data,
      totalItems,
      page: args.page,
      pageSize: args.pageSize
    }
  }
})
