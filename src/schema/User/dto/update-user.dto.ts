import { IsEmail } from 'class-validator'
import { Field, InputType, Int, ObjectType } from 'type-graphql'

import { UserRole } from '../user.enums'
import User from '../user.model'
import { withErrorsResponse } from '@src/generic-types'
import IUser from '../user.interface'

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

  @Field(() => UserRole)
  rol: UserRole
}
