import { IsEmail } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

import User from '../user.model'
import { withErrorsResponse } from '@src/generic-types'
import { UserRoles } from '../user.enums'

@ObjectType()
export class CreateUsersResponse extends withErrorsResponse(User) {}

@InputType()
export class CreateUsersInput implements Partial<User> {
  @Field()
  name: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  lastname: string

  @Field()
  password: string

  @Field(() => UserRoles)
  rol: UserRoles
}
