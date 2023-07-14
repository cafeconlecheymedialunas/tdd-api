import { type UserRepositoryInterface } from '../../domain/interfaces/repositories/UserRepositoryInterface';
import { HashPasswordServiceInterface } from '../../domain/interfaces/services/HashPasswordServiceInterface';
import { type RegisterUseCaseInterface } from '../../domain/interfaces/useCases/RegisterUseCaseInterface';
import { ClientError, validateEmail } from '../../infraestructure/utils';
import { UserDto } from '../dtos/UserDto';
import { UserInput } from '../../domain/types/inputsParams';
export class RegisterUserUseCase implements RegisterUseCaseInterface {
  private readonly repository: UserRepositoryInterface;
  private readonly hash: HashPasswordServiceInterface;
  constructor(repository: UserRepositoryInterface, hash: HashPasswordServiceInterface) {
    this.repository = repository;
    this.hash = hash;
  }
  async register(user: UserInput): Promise<UserDto | false> {
    const { email, password, name, roles } = user;
    if (email === '' || password === '' || name === '')
      throw new ClientError('Email, name and password are required fields');

    if (!validateEmail(email)) {
      throw new ClientError('Is not a valid Email');
    }

    const userExist = await this.repository.getUserByEmail(email);
    if (userExist !== undefined) throw new ClientError('There is already a user with that email');

    const passwordHash = await this.hash.hash(password);
    if (!passwordHash) throw new ClientError('The username or password does not match');

    const newUser = await this.repository.add(user);

    return newUser;
  }
}
