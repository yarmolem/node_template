import type * as t from './types'
import { PostModel } from './post.model'
import AppDataSource from '@src/data-source'
import { UNKNOWN_ERROR } from '@src/constants'
import { setError } from '@src/utils/set-error'

export const PostRepository = AppDataSource.getRepository(PostModel).extend({
  async getAllPost(args: t.GetAllPostArgs): Promise<t.GetAllPostResponse> {
    const [data, totalItems] = await this.createQueryBuilder('post').skip(args.skip).take(args.take).getManyAndCount()

    return {
      data,
      totalItems,
      page: args.page,
      pageSize: args.pageSize
    }
  },
  async createPost(input: t.CreatePostInput, { userId }: { userId?: number }): Promise<t.CreatePostResponse> {
    try {
      const data = this.create({ ...input, userId })
      return { data: await this.save(data) }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  },
  async updatePost(input: t.UpdatePostInput, { userId }: { userId?: number }): Promise<t.UpdatePostResponse> {
    try {
      const { id, ...rest } = input
      const post = await this.findOneBy({ id, userId })
      if (post === null) return setError('id', `No existe post con el ${id}`)

      await this.update(id, rest)

      return { data: { ...post, ...input } }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  }
})
