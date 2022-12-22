import { Resolver, Query, Args, Arg, Mutation, Int } from 'type-graphql'

import * as t from './category.types'
import Category from './category.model'
import { setError } from '@src/utils/setError'
import CategoryRepository from './category.repository'

@Resolver(Category)
export default class CategoryResolvers {
  repository = CategoryRepository

  @Query(() => t.GetAllCategoryResponse)
  async getAllCategorys(@Args() args: t.GetAllCategoryArgs): Promise<t.GetAllCategoryResponse> {
    return this.repository.getAllPost(args)
  }

  @Query(() => Category, { nullable: true })
  async getCategoryById(@Arg('id', () => Int) id: number): Promise<Category | null> {
    return this.repository.findOneBy({ id })
  }

  @Mutation(() => t.CreateCategoryResponse)
  async createCategory(@Arg('input') input: t.CreateCategoryInput): Promise<t.CreateCategoryResponse> {
    const cate = this.repository.create(input)
    return { data: await this.repository.save(cate) }
  }

  @Mutation(() => t.UpdateCategoryResponse)
  async updateCategory(@Arg('input') input: t.UpdateCategoryInput): Promise<t.UpdateCategoryResponse> {
    const { id, ...rest } = input
    const post = await this.repository.findOneBy({ id })
    if (!post) return setError('id', `No existe post con el ${id}`)

    await this.repository.update(id, rest)

    return { data: { ...post, ...input } }
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg('id', () => Int) id: number): Promise<boolean> {
    await this.repository.delete(id)
    return true
  }
}
