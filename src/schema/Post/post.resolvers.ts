import { Resolver, Query, Args, Arg, Mutation, Int, Authorized } from 'type-graphql'

import * as t from './dto'
import PostModel from './post.model'
import { Role } from '@prisma/client'
import { prisma } from '@src/data-source'
import { UNKNOWN_ERROR } from '@src/contants'
import { setError } from '@src/utils/setError'
import { PostRepository } from './post.repository'

@Resolver(PostModel)
export default class PostResolvers {
  @Authorized([Role.ADMIN])
  @Query(() => t.GetAllPostResponse)
  async getAllPost(@Args() args: t.GetAllPostArgs) {
    return await PostRepository.getAllPost(args)
  }

  @Authorized([Role.ADMIN])
  @Query(() => PostModel, { nullable: true })
  async getPostById(@Arg('id', () => Int) id: number): Promise<PostModel | null> {
    return await prisma.post.findUnique({ where: { id } })
  }

  @Authorized([Role.ADMIN])
  @Mutation(() => t.CreatePostResponse, { nullable: true })
  async createPost(@Arg('input') input: t.CreatePostInput): Promise<t.CreatePostResponse> {
    try {
      const post = await prisma.post.create({ data: input })

      return { data: post }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  }

  @Authorized([Role.ADMIN])
  @Mutation(() => t.UpdatePostResponse, { nullable: true })
  async updatePost(@Arg('input') input: t.UpdatePostInput): Promise<t.UpdatePostResponse> {
    try {
      const post = await prisma.post.findUnique({ where: { id: input.id } })
      if (post === null) return setError('id', `No existe post con el ${input.id}`)

      const updatedPost = await prisma.post.update({ where: { id: input.id }, data: input })

      return { data: updatedPost }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  }

  @Authorized([Role.ADMIN])
  @Mutation(() => Boolean)
  async deletePost(@Arg('id', () => Int) id: number): Promise<boolean> {
    return await prisma.post
      .delete({ where: { id } })
      .then(() => true)
      .catch(() => false)
  }
}
