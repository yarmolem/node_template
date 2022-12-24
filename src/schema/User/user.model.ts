import { ID, Field, ObjectType } from 'type-graphql'
import {
  Column,
  Entity,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

import Post from '../Post/post.model'
import { UserRoles } from './user.enums'

@Entity()
@ObjectType()
export default class User {
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

  @Field(() => UserRoles)
  @Column()
  rol: UserRoles

  @JoinColumn()
  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[]

  @Field()
  @CreateDateColumn()
  createdAt: Date = new Date()

  @Field()
  @UpdateDateColumn()
  updatedAt: Date = new Date()
}
