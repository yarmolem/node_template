import { Field, ID, ObjectType } from 'type-graphql'
import { ViewEntity, ViewColumn, DataSource } from 'typeorm'
import Category from '../Category/category.model'
import Post from '../Post/post.model'

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('post.id', 'id')
      .addSelect('post.title', 'title')
      .addSelect('category.name', 'categoryName')
      .from(Post, 'post')
      .leftJoin(Category, 'category', 'category.id = post.categoryId')
})
export default class PostCategory {
  @Field(() => ID)
  @ViewColumn()
  id: number

  @Field()
  @ViewColumn()
  title: string

  @Field()
  @ViewColumn()
  categoryName: string
}
