import { eq } from 'drizzle-orm'
import { Resolver, Query, Args, Arg, Mutation, Int, Authorized } from 'type-graphql'

import * as t from './dto'
import { PostModel } from './post.model'
import { PostSchema } from './post.schema'

import { db } from '@src/data-source'
import { Role } from '../User/user.schema'
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
  async getPostById(@Arg('id', () => Int) id: number): Promise<PostModel | undefined> {
    return await db.query.posts.findFirst({ where: eq(PostSchema.id, id) })
  }

  @Authorized([Role.ADMIN])
  @Mutation(() => t.CreatePostResponse, { nullable: true })
  async createPost(@Arg('input') input: t.CreatePostInput): Promise<t.CreatePostResponse> {
    try {
      const post = await db.insert(PostSchema).values(input).returning()
      return { data: post?.[0] }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  }

  @Authorized([Role.ADMIN])
  @Mutation(() => t.UpdatePostResponse, { nullable: true })
  async updatePost(@Arg('input') input: t.UpdatePostInput): Promise<t.UpdatePostResponse> {
    try {
      const post = await db.query.posts.findFirst({ where: eq(PostSchema.id, input.id) })
      if (post === undefined) return setError('id', `No existe post con el ${input.id}`)

      const updatedPost = await db.update(PostSchema).set(input).returning()

      return { data: updatedPost?.[0] }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  }

  @Authorized([Role.ADMIN])
  @Mutation(() => Boolean)
  async deletePost(@Arg('id', () => Int) id: number): Promise<boolean> {
    return await db
      .delete(PostSchema)
      .where(eq(PostSchema.id, id))
      .then(() => true)
      .catch(() => false)
  }
}
