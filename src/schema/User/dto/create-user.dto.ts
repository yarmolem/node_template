import { IsEmail } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

import User from '../user.model'
import IUser from '../user.interface'
import { UserRols } from '../user.enums'
import { withErrorsResponse } from '@src/generic-types'

type CreateUsers = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>

@ObjectType()
export class CreateUsersResponse extends withErrorsResponse(User) {}

@InputType()
export class CreateUsersInput implements CreateUsers {
  @Field()
  name: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  lastname: string

  @Field()
  password: string

  @Field(() => UserRols)
  rol: UserRols
}
