import { AppDataSource } from '@src/db'
import Post from './post.model'
import { GetAllPostArgs, GetAllPostResponse } from './post.types'

export const PostRepository = AppDataSource.getRepository(Post).extend({
  async getAllPost({ page, pageSize }: GetAllPostArgs): Promise<GetAllPostResponse> {
    const [data, totalItems] = await this.createQueryBuilder()
      .skip(page === 1 ? 0 : pageSize * (page - 1))
      .take(pageSize)
      .getManyAndCount()

    return {
      data,
      page,
      pageSize,
      totalItems
    }
  }
})
