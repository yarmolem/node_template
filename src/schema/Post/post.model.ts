import { ID, Field, ObjectType, Int } from 'type-graphql'
import { Column, Entity, ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

import User from '../User/user.model'

@Entity()
@ObjectType()
export default class Post {
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

  @ManyToOne(() => User, (post) => post.posts)
  user?: User

  @Field()
  @CreateDateColumn()
  createdAt: Date = new Date()

  @Field()
  @UpdateDateColumn()
  updatedAt: Date = new Date()
}
