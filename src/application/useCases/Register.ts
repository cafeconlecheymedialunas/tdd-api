import { type UserRepositoryInterface } from '../../domain/interfaces/repositories/UserMockable';
import { HashPasswordServiceInterface } from '../../domain/interfaces/services/HashPasswordable';
import { ValidatorInterface } from '../../domain/interfaces/services/Validatorable';
import { type RegisterUseCaseInterface } from '../../domain/interfaces/useCases/Registerable';
import { ClientError, UserWithThatEmailAlreadyExistsException, ValidationException } from '../../domain/types/errors';
import { Condition, UserRequestParams } from '../../domain/types/requestParams';
import { Rules } from '../../domain/types/validationRules';
import { UserDto } from '../dtos/User';

export class RegisterUseCase implements RegisterUseCaseInterface {
  private readonly repository: UserRepositoryInterface;
  private readonly hash: HashPasswordServiceInterface;
  private readonly validator: ValidatorInterface;
  constructor(repository: UserRepositoryInterface, hash: HashPasswordServiceInterface, validator: ValidatorInterface) {
    this.repository = repository;

    this.hash = hash;

    this.validator = validator;
  }

  private validate = (email: string, password: string, name: string): void => {
    const rules = [
      { key: 'email', rules: [Rules.isNotEmpty, Rules.isString, Rules.isEmail], value: email },
      { key: 'password', rules: [Rules.isNotEmpty, Rules.isStrongPassword], value: password },
      { key: 'name', rules: [Rules.isNotEmpty, Rules.isString], value: name },
    ];

    const errors = this.validator.validate(rules);

    if (errors.length > 0) throw new ValidationException(errors);
  };

  private userExist = async (email: string): Promise<void> => {
    const conditions = [{ key: 'email', condition: Condition.Equal, value: email }];

    const userExist = await this.repository.filter(conditions);

    if (userExist.length > 0) throw new UserWithThatEmailAlreadyExistsException(email);
  };

  private generateHash = async (password: string): Promise<string> => {
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
