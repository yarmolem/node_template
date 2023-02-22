import { Resolver, Query, Args, Arg, Mutation, Int } from 'type-graphql'

import * as t from './dto'
import Post from './post.model'
import { UNKNOWN_ERROR } from '@src/contants'
import { setError } from '@src/utils/setError'
import { PostRepository } from './post.repository'

@Resolver(Post)
export default class PostResolvers {
  repository = PostRepository

  @Query(() => t.GetAllPostResponse)
  async getAllPost(@Args() args: t.GetAllPostArgs) {
    return this.repository.getAllPost(args)
  }

  @Query(() => Post, { nullable: true })
  async getPostById(@Arg('id', () => Int) id: number): Promise<Post | null> {
    return this.repository.findOneBy({ id })
  }

  @Mutation(() => t.CreatePostResponse, { nullable: true })
  async createPost(@Arg('input') input: t.CreatePostInput): Promise<t.CreatePostResponse> {
    try {
      const data = this.repository.create(input)
      return { data: await this.repository.save(data) }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  }

  @Mutation(() => t.UpdatePostResponse, { nullable: true })
  async updatePost(@Arg('input') input: t.UpdatePostInput): Promise<t.UpdatePostResponse> {
    try {
      const { id, ...rest } = input
      const post = await this.repository.findOneBy({ id })
      if (!post) return setError('id', `No existe post con el ${id}`)

      await this.repository.update(id, rest)

      return { data: { ...post, ...input } }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg('id', () => Int) id: number): Promise<boolean> {
    try {
      await this.repository.delete(id)
      return true
    } catch (error) {
      console.log({ error })
      return false
    }
  }
}
