import type { User } from '../User/user.interface'

export interface Post {
  id: number
  title: string
  content: string
  userId: number
  user?: User
  createdAt: Date
  updatedAt: Date
}
