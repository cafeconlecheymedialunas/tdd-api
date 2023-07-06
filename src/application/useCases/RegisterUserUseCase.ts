
import { type User } from '../../domain/entities/User.entity'
import { type UserRepositoryInterface } from '../../domain/interfaces/repositories/UserRepositoryInterface'
import { HashPasswordServiceInterface } from '../../domain/interfaces/services/HashPasswordServiceInterface'
import { type RegisterUseCaseInterface } from '../../domain/interfaces/useCases/RegisterUseCaseInterface'

import { type UserInterface } from '../../domain/types/user.types'

export class RegisterUserUseCase implements RegisterUseCaseInterface {
  private readonly repository: UserRepositoryInterface
  private readonly hash: HashPasswordServiceInterface

  constructor(repository: UserRepositoryInterface,hash:HashPasswordServiceInterface) {
    this.repository = repository
    this.hash = hash
  }

  async register({ name, email, password, roles }: UserInterface): Promise<false | User> {
  
    if (email === '' || password === '' || name === ''  ) return false
    const user = await this.repository.getUserByEmail(email);
   
    if (user !== undefined) return false

    const passwordHash = await this.hash.hash(password)
    
    if (!passwordHash) return false
    
    const newUser = await this.repository.add({ name, email, password: passwordHash, roles })
  
    return newUser
  }

}