import * as t from './post-category.types'
import AppDataSource from '@src/data-source'
import PostCategory from './post-category.model'

const PostCategoryRepository = AppDataSource.getRepository(PostCategory).extend({
  async getAll({ page, pageSize }: t.GetAllPostCategoryArgs): Promise<t.GetAllPostCategoryResponse> {
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

export default PostCategoryRepository
