
import { type User } from '../domain/entities/User.entity'
import { type UserRepositoryInterface } from '../domain/interfaces/repositories/UserRepositoryInterface'
import { type RegisterUseCaseInterface } from '../domain/interfaces/useCases/RegisterUseCaseInterface'
import { HttpCustomResponse } from '../domain/types/http-response'
import { type UserInterface } from '../domain/types/user.types'
import { HashPasswordUseCase } from './HashPasswordUseCase'

export class RegisterUserUseCase implements RegisterUseCaseInterface {
  private readonly repository: UserRepositoryInterface
  private readonly hash: HashPasswordUseCase

  constructor(repository: UserRepositoryInterface,hash:HashPasswordUseCase) {
    this.repository = repository
    this.hash = hash
  }

  async register({ name, email, password }: UserInterface): Promise<HttpCustomResponse> {
    if (email === '' || password === '' || name === '') return HttpCustomResponse.forbidden()
    const user = await this.repository.getUserByEmail(email);
    if ( user !== undefined) return HttpCustomResponse.internalServerError()
    const passwordHash = await this.hash.hash(password)
    const newUser = this.repository.add({ name, email, password :passwordHash})
    return HttpCustomResponse.ok(newUser)
  }

}