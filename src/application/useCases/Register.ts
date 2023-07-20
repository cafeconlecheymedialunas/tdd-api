import { type UserRepositoryInterface } from '../../domain/interfaces/repositories/UserMockable';
import { HashPasswordServiceInterface } from '../../domain/interfaces/services/HashPasswordable';
import { type RegisterUseCaseInterface } from '../../domain/interfaces/useCases/Registerable';
import { ClientError, UserWithThatEmailAlreadyExistsException, ValidationException } from '../../domain/types/errors';
import { Condition, UserRequestParams } from '../../domain/types/requestParams';
import { UserDto } from '../dtos/User';
import { Validation } from '../services/Validation';


export class RegisterUseCase implements RegisterUseCaseInterface {
  private readonly repository: UserRepositoryInterface;
  private readonly hash: HashPasswordServiceInterface;

  constructor(repository: UserRepositoryInterface, hash: HashPasswordServiceInterface) {
    this.repository = repository;

    this.hash = hash;
  }

  validate = (email: string, password: string, name: string): void => {
    const errors = [];

    if (!Validation.isString(email)) {
      errors.push({ key: 'email', error: 'Email must be a string' });
    }
    if (!Validation.isNotEmpty(email)) {
      errors.push({ key: 'email', error: 'Email is required' });
    }
    if (!Validation.isEmail(email)) {
      errors.push({ key: 'email', error: 'This Is not a valid Email' });
    }

    if (!Validation.isNotEmpty(name)) {
      errors.push({ key: 'name', error: 'Name is required' });
    }
    if (!Validation.isString(name)) {
      errors.push({ key: 'name', error: 'Name must be a string' });
    }

    if (!Validation.isNotEmpty(password)) {
      errors.push({ key: 'password', error: 'Password is required' });
    }
    if (!Validation.isStrongPassword(password)) {
      errors.push({ key: 'password', error: 'The password must be at least 8 characters long, contain at least one uppercase letter and one lowercase letter, have at least one digit, and include one special character' });
    }
    if (errors.length > 0) throw new ValidationException(errors);
  };

  userExist = async (email: string): Promise<void> => {
    const conditions = [{ key: 'email', condition: Condition.Equal, value: email }];

    const userExist = await this.repository.filter(conditions);

    if (userExist.length > 0) throw new UserWithThatEmailAlreadyExistsException(email);
  };

  generateHash = async (password: string): Promise<string> => {
    const passwordHash = await this.hash.hash(password);

    if (!passwordHash) throw new ClientError();

    return passwordHash;
  };

  register = async (user: UserRequestParams): Promise<UserDto | false> => {
    const { email, password, name } = user;

    this.validate(email, password, name);

    await this.userExist(email);

    const passwordHashed = await this.generateHash(password);

    user.password = passwordHashed;
    const newUser = await this.repository.add(user);

    return newUser;
  };
}
