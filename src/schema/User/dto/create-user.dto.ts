import { z } from 'zod'
import { Field, InputType, ObjectType } from 'type-graphql'

import UserModel from '../user.model'
import { type Prisma, Role } from '@prisma/client'
import { type FieldError, withErrorsResponse } from '@src/generic-types'

@ObjectType()
export class CreateUsersResponse extends withErrorsResponse(UserModel) {}

@InputType()
export class CreateUsersInput implements Prisma.UserCreateInput {
  @Field()
  name: string

  @Field()
  email: string

  @Field()
  lastname: string

  @Field()
  password: string

  @Field(() => Role)
  rol: Role

  static schema = z.object({
    email: z.string().email('Invalid email'),
    name: z.string().trim().min(2, 'Field required'),
    lastname: z.string().trim().min(2, 'Field required'),
    password: z.string().trim().min(8, '8 characters minimun'),
    rol: z.enum([Role.USER, Role.ADMIN])
  })

  static async validate(args: z.infer<typeof this.schema>) {
    const errors: FieldError[] = []
    const parsed = await this.schema.spa(args)

    if (!parsed.success) {
      const obj = parsed.error.flatten().fieldErrors
      for (const key of Object.keys(obj)) {
        errors.push({
          field: key,
          message: obj?.[key as keyof typeof obj] ?? []
        })
      }
    }

    return { ok: parsed.success, errors }
  }
}
