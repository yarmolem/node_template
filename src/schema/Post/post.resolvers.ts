import { Resolver, Query, Args, Arg, Mutation, Int } from 'type-graphql'

import Post from './post.model'
import * as t from './post.types'
import { PostRepository } from './post.repository'
import { setError } from '@src/utils/setError'

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
    const data = await this.repository.createQueryBuilder('post').insert().values(input).returning('*').execute()
    return { data: data.generatedMaps[0] as Post }
  }

  @Mutation(() => t.UpdatePostResponse, { nullable: true })
  async updatePost(@Arg('input') input: t.UpdatePostInput): Promise<t.UpdatePostResponse> {
    const { id, ...rest } = input
    const post = await this.repository.findOneBy({ id })
    if (!post) return setError('id', `No existe post con el ${id}`)

    await this.repository.update(id, rest)

    return { data: { ...post, ...input } }
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg('id', () => Int) id: number): Promise<boolean> {
    await this.repository.delete(id)
    return true
  }
}
