import { ID, Field, ObjectType, Int } from 'type-graphql'
import { Column, Entity, ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

import User from '../User/user.model'
import { IPost } from './post.interface'

@Entity()
@ObjectType()
export default class Post implements IPost {
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
  @ManyToOne(() => User, (post) => post.posts)
  user?: User
}
