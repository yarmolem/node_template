import { Resolver, Query, Args, Arg, Mutation, Int, Authorized, Ctx } from 'type-graphql'

import * as t from './types'
import { PostModel } from './post.model'
import { ApolloCtx } from '@src/interface'
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
    return await this.repository.createPost(input, { userId: req.user?.id })
  }

  @Authorized()
  @Mutation(() => t.UpdatePostResponse, { nullable: true })
  async updatePost(@Ctx() { req }: ApolloCtx, @Arg('input') input: t.UpdatePostInput): Promise<t.UpdatePostResponse> {
    return await this.repository.updatePost(input, { userId: req.user?.id })
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deletePost(@Ctx() { req }: ApolloCtx, @Arg('id', () => Int) id: number): Promise<boolean> {
    return await this.repository
      .delete({ id, userId: req.user?.id })
      .then(() => true)
      .catch(() => false)
  }
}
