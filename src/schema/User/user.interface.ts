import { UserRols } from './user.enums'

export default interface IUser {
  id: number
  email: string
  name: string
  lastname: string
  password: string
  rol: UserRols
  createdAt: Date
  updatedAt: Date
}
