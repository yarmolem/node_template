import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, OneToMany, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

import IUser from './user.interface'
import Post from '../Post/post.model'
import { UserRole } from './user.enums'

@Entity()
@ObjectType()
export default class User implements IUser {
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
  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[]
}
