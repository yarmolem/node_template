import { Field, Int, ObjectType, registerEnumType } from 'type-graphql'
import { Role, type User } from './user.schema'

registerEnumType(Role, { name: 'Role' })

@ObjectType()
export default class UserModel implements User {
  @Field(() => Int)
  id: number

  @Field()
  email: string

  @Field()
  name: string

  @Field()
  lastname: string

  password: string

  @Field(() => Role)
  role: Role

  @Field()
  createdAt: Date = new Date()

  @Field()
  updatedAt: Date = new Date()
}
