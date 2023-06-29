
import { type User } from '../../entities/User.entity'
import { HttpCustomResponse } from '../../types/http-response'
import { type UserInterface } from '../../types/user.types'

export interface RegisterUseCaseInterface {
  // users: User[]
  register: ({ name, email, password }: UserInterface) => HttpCustomResponse
  // auth: (email: string, password: string) => boolean | User
}