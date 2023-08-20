import { ID, Field, ObjectType, Int } from 'type-graphql'
import { Column, Entity, ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

import { Post } from './post.interface'
import { UserModel } from '../User/user.model'

@Entity({ name: 'posts' })
@ObjectType()
export class PostModel implements Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  title: string

  @Field()
  @Column()
  content: string

  @Field(() => Int)
  @Column()
  userId: number

  @Field()
  @CreateDateColumn()
  createdAt: Date = new Date()

  @Field()
  @UpdateDateColumn()
  updatedAt: Date = new Date()

  // Relations
  @ManyToOne(() => UserModel, (post) => post.posts)
  user?: UserModel
}
