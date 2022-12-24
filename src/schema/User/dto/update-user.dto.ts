import { IsEmail } from 'class-validator'
import { Field, InputType, Int, ObjectType } from 'type-graphql'

import { UserRols } from '../user.enums'
import User, { IUser } from '../user.model'
import { withErrorsResponse } from '@src/generic-types'

@ObjectType()
export class UpdateUsersResponse extends withErrorsResponse(User) {}

@InputType()
export class UpdateUsersInput implements Partial<IUser> {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  lastname: string

  @Field(() => UserRols)
  rol: UserRols
}
