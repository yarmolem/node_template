import * as t from './dto'
import Post from './post.model'
import AppDataSource from '@src/data-source'

export const PostRepository = AppDataSource.getRepository(Post).extend({
  async getAllPost({ page, pageSize, skip, take }: t.GetAllPostArgs): Promise<t.GetAllPostResponse> {
    const [data, totalItems] = await this.createQueryBuilder().skip(skip).take(take).getManyAndCount()

    return {
      data,
      page,
      pageSize,
      totalItems
    }
  }
})
