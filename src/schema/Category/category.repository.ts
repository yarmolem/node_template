import * as t from './category.types'
import Category from './category.model'
import AppDataSource from '@src/data-source'

const CategoryRepository = AppDataSource.getRepository(Category).extend({
  async getAllPost({ page, pageSize }: t.GetAllCategoryArgs): Promise<t.GetAllCategoryResponse> {
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

export default CategoryRepository
