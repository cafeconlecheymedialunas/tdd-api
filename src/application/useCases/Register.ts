import { type UserMockable } from '../../domain/interfaces/repositories/UserMockable';
import { HashPasswordable } from '../../domain/interfaces/services/HashPasswordable';
import { Validatorable } from '../../domain/interfaces/services/Validatorable';
import { type Registerable } from '../../domain/interfaces/useCases/Registerable';
import {
  ClientException,
  UserWithThatEmailAlreadyExistsException,
  ValidationException,
} from '../../domain/types/errors';
import { UserRequestParams } from '../../domain/types/requestParams';
import { Condition } from '../../domain/types/response';
import { Rules } from '../../domain/types/validationRules';
import { UserDto } from '../dtos/User';

export class Register implements Registerable {
  private readonly repository: UserMockable;
  private readonly hash: HashPasswordable;
  private readonly validator: Validatorable;
  constructor(repository: UserMockable, hash: HashPasswordable, validator: Validatorable) {
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

    if (!passwordHash) throw new ClientException();

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
