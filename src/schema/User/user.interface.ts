import { UserRole } from './user.enums'

export interface User {
  id: number
  email: string
  name: string
  lastname: string
  password: string
  rol: UserRole
  createdAt: Date
  updatedAt: Date
}
