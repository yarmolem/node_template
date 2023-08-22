import { Resolver, Query, Args, Arg, Mutation, Int, Authorized, Ctx } from 'type-graphql'

import * as t from './types'
import { PostModel } from './post.model'
import { ApolloCtx } from '@src/interface'
import { UNKNOWN_ERROR } from '@src/constants'
import { setError } from '@src/utils/set-error'
import { PostRepository } from './post.repository'

@Resolver(PostModel)
export default class PostResolvers {
  repository = PostRepository

  @Query(() => t.GetAllPostResponse)
  async getAllPost(@Args() args: t.GetAllPostArgs) {
    return await this.repository.getAllPost(args)
  }

  @Query(() => PostModel, { nullable: true })
  async getPostById(@Arg('id', () => Int) id: number): Promise<PostModel | null> {
    return await this.repository.findOneBy({ id })
  }

  @Authorized()
  @Mutation(() => t.CreatePostResponse, { nullable: true })
  async createPost(@Ctx() { req }: ApolloCtx, @Arg('input') input: t.CreatePostInput): Promise<t.CreatePostResponse> {
    try {
      const data = this.repository.create({ ...input, userId: req.user.id })
      return { data: await this.repository.save(data) }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  }

  @Authorized()
  @Mutation(() => t.UpdatePostResponse, { nullable: true })
  async updatePost(@Ctx() { req }: ApolloCtx, @Arg('input') input: t.UpdatePostInput): Promise<t.UpdatePostResponse> {
    try {
      const { id, ...rest } = input
      const post = await this.repository.findOneBy({ id, userId: req.user.id })
      if (post === null) return setError('id', `No existe post con el ${id}`)

      await this.repository.update(id, rest)

      return { data: { ...post, ...input } }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deletePost(@Ctx() { req }: ApolloCtx, @Arg('id', () => Int) id: number): Promise<boolean> {
    try {
      await this.repository.delete({ id, userId: req.user.id })
      return true
    } catch (error) {
      console.log({ error })
      return false
    }
  }
}
