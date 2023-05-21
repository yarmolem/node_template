import { IsEmail } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

import User from '../user.model'
import { type Prisma, Role } from '@prisma/client'
import { withErrorsResponse } from '@src/generic-types'

@ObjectType()
export class CreateUsersResponse extends withErrorsResponse(User) {}

@InputType()
export class CreateUsersInput implements Prisma.UserCreateInput {
  @Field()
  name: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  lastname: string

  @Field()
  password: string

  @Field(() => Role)
  rol: Role
}
