import { type UserRepositoryInterface } from '../../domain/interfaces/repositories/UserRepositoryInterface'
import { HashPasswordServiceInterface } from '../../domain/interfaces/services/HashPasswordServiceInterface'
import { type RegisterUseCaseInterface } from '../../domain/interfaces/useCases/RegisterUseCaseInterface'
import { HttpStatuses } from '../../domain/types/response'
import { ClientError } from '../../infraestructure/utils'
import { UserDto } from '../dtos/UserDto'
export class RegisterUserUseCase implements RegisterUseCaseInterface {
  private readonly repository: UserRepositoryInterface
  private readonly hash: HashPasswordServiceInterface
  constructor(repository: UserRepositoryInterface, hash: HashPasswordServiceInterface) {
    this.repository = repository
    this.hash = hash
  }
  async register({ name, email, password, roles }: { name: string, email: string, password: string, roles: number[] }): Promise<UserDto> {
    if (email === '' || password === '' || name === '') throw new ClientError('Email, name and password are required fields')
    const user = await this.repository.getUserByEmail(email);
    if (user !== undefined) throw new ClientError('There is already a user with that email')
    const passwordHash = await this.hash.hash(password)
    if (!passwordHash) throw new ClientError('The username or password does not match')
    const newUser = await this.repository.add({ name, email, password: passwordHash, roles })
    return newUser
  }
}