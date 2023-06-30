
import { type User } from '../domain/entities/User.entity'
import { type UserRepositoryInterface } from '../domain/interfaces/repositories/UserRepositoryInterface'
import { type RegisterUseCaseInterface } from '../domain/interfaces/useCases/RegisterUseCaseInterface'
import { HttpCustomResponse } from '../domain/types/http-response'
import { type UserInterface } from '../domain/types/user.types'

export class RegisterUserUseCase implements RegisterUseCaseInterface {
  private readonly repository: UserRepositoryInterface

  constructor(repository: UserRepositoryInterface) {
    this.repository = repository
  }

  async register({ name, email, password }: UserInterface): Promise<HttpCustomResponse> {
    if (email === '' || password === '' || name === '') return HttpCustomResponse.forbidden()
    const user = await this.repository.getUserByEmail(email);
    if ( user !== undefined) return HttpCustomResponse.internalServerError()

    const newUser = this.repository.add({ name, email, password })
    return HttpCustomResponse.ok(newUser)
  }

}