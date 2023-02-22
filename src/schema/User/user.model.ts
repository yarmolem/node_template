import { Role, User } from '@prisma/client'
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql'

registerEnumType(Role, { name: 'Role' })

@ObjectType()
export default class UserModel implements User {
  @Field(() => ID)
  id: number

  @Field()
  email: string

  @Field()
  name: string

  @Field()
  lastname: string

  password: string

  @Field(() => Role)
  rol: Role

  @Field()
  createdAt: Date = new Date()

  @Field()
  updatedAt: Date = new Date()
}
