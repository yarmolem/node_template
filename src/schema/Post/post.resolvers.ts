import { Resolver, Query, Args, Arg, Mutation, Int, Authorized, Ctx } from 'type-graphql'

import * as t from './dto'
import { PostModel } from './post.model'
import { ApolloCtx } from '@src/interface'
import { UNKNOWN_ERROR } from '@src/contants'
import { setError } from '@src/utils/set-error'
import { PostRepository } from './post.repository'

@Resolver(PostModel)
export default class PostResolvers {
  repository = PostRepository

  @Authorized()
  @Query(() => t.GetAllPostResponse)
  async getAllPost(@Ctx() { req }: ApolloCtx, @Args() args: t.GetAllPostArgs) {
    return await this.repository.getAllPost(args, { userId: req.user?.id })
  }

  @Authorized()
  @Query(() => PostModel, { nullable: true })
  async getPostById(@Ctx() { req }: ApolloCtx, @Arg('id', () => Int) id: number): Promise<PostModel | null> {
    const user = req.user
    if (user === undefined) return null

    return await this.repository.findOneBy({ id, userId: user.id })
  }

  @Authorized()
  @Mutation(() => t.CreatePostResponse, { nullable: true })
  async createPost(@Ctx() { req }: ApolloCtx, @Arg('input') input: t.CreatePostInput): Promise<t.CreatePostResponse> {
    try {
      const data = this.repository.create({ ...input, userId: req.user?.id })
      return { data: await this.repository.save(data) }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  }

  @Authorized()
  @Mutation(() => t.UpdatePostResponse, { nullable: true })
  async updatePost(@Ctx() { req }: ApolloCtx, @Arg('input') input: t.UpdatePostInput): Promise<t.UpdatePostResponse> {
    const user = req.user
    if (user === undefined) return setError('token', 'Invalid token')

    try {
      const { id, ...rest } = input
      const post = await this.repository.findOneBy({ id, userId: user.id })
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
      await this.repository.delete({ id, userId: req.user?.id })
      return true
    } catch (error) {
      console.log({ error })
      return false
    }
  }
}
