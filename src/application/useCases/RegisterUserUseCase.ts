import { type UserRepositoryInterface } from '../../domain/interfaces/repositories/UserRepositoryInterface';

import { HashPasswordServiceInterface } from '../../domain/interfaces/services/HashPasswordServiceInterface';

import { type RegisterUseCaseInterface } from '../../domain/interfaces/useCases/RegisterUseCaseInterface';

import {
  ClientError,
  UserNotFoundException,
  UserWithThatEmailAlreadyExistsException,
} from '../../domain/types/response';

import { UserDto } from '../dtos/UserDto';

import { Condition, UserInput } from '../../domain/types/inputsParams';
import { validateEmail } from '../../infraestructure/utils';

export class RegisterUserUseCase implements RegisterUseCaseInterface {
  private readonly repository: UserRepositoryInterface;
  private readonly hash: HashPasswordServiceInterface;
  constructor(repository: UserRepositoryInterface, hash: HashPasswordServiceInterface) {
    this.repository = repository;

    this.hash = hash;
  }
  async register(user: UserInput): Promise<UserDto | false> {
    const { email, password, name } = user;

    if (email === '' || password === '' || name === '') throw new ClientError();

    if (!validateEmail(email)) {
      throw new ClientError();
    }
    const conditions = [{ key: 'email', condition: Condition.Equal, value: email }];

    const userExist = await this.repository.filter(conditions);

    if (userExist === false) throw new UserWithThatEmailAlreadyExistsException(email);

    const passwordHash = await this.hash.hash(password);

    if (!passwordHash) throw new ClientError();

    const newUser = await this.repository.add(user);

    return newUser;
  }
}
