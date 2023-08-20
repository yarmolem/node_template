import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, OneToMany, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

import { UserRole } from './user.enums'
import { PostModel } from '../Post/post.model'

import type { User } from './user.interface'

@Entity({ name: 'users' })
@ObjectType()
export class UserModel implements User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ unique: true })
  email: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  lastname: string

  @Column()
  password: string

  @Field(() => UserRole)
  @Column({ type: 'enum', enum: UserRole })
  rol: UserRole

  @Field()
  @CreateDateColumn()
  createdAt: Date = new Date()

  @Field()
  @UpdateDateColumn()
  updatedAt: Date = new Date()

  // Relations
  @OneToMany(() => PostModel, (post) => post.user)
  posts?: PostModel[]
}
