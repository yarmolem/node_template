import { UserRole } from './user.enums'

export default interface IUser {
  id: number
  email: string
  name: string
  lastname: string
  password: string
  rol: UserRole
  createdAt: Date
  updatedAt: Date
}
