import type { UserRole } from './user.enums'
import type { Post } from '../Post/post.interface'

export interface User {
  id: number
  email: string
  name: string
  lastname: string
  password: string
  rol: UserRole
  posts?: Post[]
  createdAt: Date
  updatedAt: Date
}
