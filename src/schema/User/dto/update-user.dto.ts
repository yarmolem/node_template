import { IsEmail } from 'class-validator'
import { Field, InputType, Int, ObjectType } from 'type-graphql'

import UserModel from '../user.model'
import { withErrorsResponse } from '@src/generic-types'
import { Role } from '@prisma/client'

@ObjectType()
export class UpdateUsersResponse extends withErrorsResponse(UserModel) {}

@InputType()
export class UpdateUsersInput implements Partial<UserModel> {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  lastname: string

  @Field(() => Role)
  rol: Role
}
