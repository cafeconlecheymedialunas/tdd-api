import { type UserRepositoryInterface } from '../../domain/interfaces/repositories/UserRepositoryInterface';

import { HashPasswordServiceInterface } from '../../domain/interfaces/services/HashPasswordServiceInterface';

import { type RegisterUseCaseInterface } from '../../domain/interfaces/useCases/RegisterUseCaseInterface';

import {
  ClientError,
  UserNotFoundException,
  UserWithThatEmailAlreadyExistsException,
  ValidationException,
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

  validate(email: string, password: string, name: string): void {
    const errors = [];

    if (typeof email !== 'string') {
      errors.push({ key: 'email', error: 'Email must be a string' });
    }
    if (!email) {
      errors.push({ key: 'email', error: 'Email is required' });
    }
    if (!validateEmail(email)) {
      errors.push({ key: 'email', error: 'This Is not a valid Email' });
    }

    if (!name) {
      errors.push({ key: 'name', error: 'Name is required' });
    }
    if (typeof name !== 'string') {
      errors.push({ key: 'email', error: 'Name must be a string' });
    }

    if (!password) {
      errors.push({ key: 'password', error: 'Password is required' });
    }
    if (typeof password !== 'string') {
      errors.push({ key: 'email', error: 'Password must be a string' });
    }
    if (errors.length > 0) throw new ValidationException(errors);
  }

  async userExist(email: string): Promise<void> {
    const conditions = [{ key: 'email', condition: Condition.Equal, value: email }];

    const userExist = await this.repository.filter(conditions);

    if (userExist.length > 0) throw new UserWithThatEmailAlreadyExistsException(email);
  }

  async generateHash(password: string): Promise<string> {
    const passwordHash = await this.hash.hash(password);

    if (!passwordHash) throw new ClientError();

    return passwordHash;
  }

  async register(user: UserInput): Promise<UserDto | false> {
    const { email, password, name } = user;

    this.validate(email, password, name);

    await this.userExist(email);

    const passwordHashed = await this.generateHash(password);

    user.password = passwordHashed;
    const newUser = await this.repository.add(user);

    return newUser;
  }
}
