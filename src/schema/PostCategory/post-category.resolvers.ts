import { Resolver, Query, Args, Arg, Int } from 'type-graphql'

import * as t from './post-category.types'
import Category from './post-category.model'
import PostCategoryRepository from './post-category.repository'

@Resolver(Category)
export default class PostCategoryResolvers {
  repository = PostCategoryRepository

  @Query(() => t.GetAllPostCategoryResponse)
  async getAllPostCategorys(@Args() args: t.GetAllPostCategoryArgs): Promise<t.GetAllPostCategoryResponse> {
    return this.repository.getAll(args)
  }

  @Query(() => Category, { nullable: true })
  async getPostCategoryById(@Arg('id', () => Int) id: number): Promise<Category | null> {
    return this.repository.findOneBy({ id })
  }
}
