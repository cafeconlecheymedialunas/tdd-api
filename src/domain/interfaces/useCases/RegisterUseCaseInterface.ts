import { HttpCustomResponse } from '../../types/HttpCustomResponse'
export interface RegisterUseCaseInterface {
  register: ({ name, email, password, roles }: { name: string, email: string, password: string, roles: number[] }) => HttpCustomResponse
}