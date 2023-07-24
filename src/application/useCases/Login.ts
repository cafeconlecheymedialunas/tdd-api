import { UserMockable } from '../../domain/interfaces/repositories/UserMockable';
import { HashPasswordable } from '../../domain/interfaces/services/HashPasswordable';
import { JsonWebTokenable } from '../../domain/interfaces/services/JsonWebTokenable';
import {
  ValidationException,
  WrongAuthenticationTokenException,
  WrongCredentialsException,
} from '../../domain/types/errors';
import { Payload } from '../../domain/types/response';
import { UserDto } from '../dtos/User';
import { Condition } from '../../domain/types/response';
import { Validatorable } from '../../domain/interfaces/services/Validatorable';
import { Rules } from '../../domain/types/validationRules';

export class Login {
  private readonly repository: UserMockable;
  private readonly hashService: HashPasswordable;
  private readonly jwt: JsonWebTokenable;
  private readonly validator: Validatorable;

  constructor(
    repository: UserMockable,
    hashService: HashPasswordable,
    jwt: JsonWebTokenable,
    validator: Validatorable,
  ) {
    this.repository = repository;

    this.hashService = hashService;

    this.jwt = jwt;

    this.validator = validator;
  }

  validate = (email: string, password: string): void => {
    const rules = [
      { key: 'email', rules: [Rules.isNotEmpty, Rules.isEmail], value: email },
      { key: 'password', rules: [Rules.isNotEmpty], value: password },
    ];

    const errors = this.validator.validate(rules);

    if (errors.length > 0) throw new ValidationException(errors);
  };

  private sigIn = async (email: string, password: string): Promise<UserDto> => {
    this.validate(email, password);
    const conditions = [{ key: 'email', condition: Condition.Equal, value: email }];

    const users = await this.repository.filter(conditions);

    if (users.length === 0) throw new WrongCredentialsException();

    const passwordMatch = await this.hashService.verify(password, users[0].password);

    if (!passwordMatch) {
      throw new WrongCredentialsException();
    }

    return users[0];
  };

  private generateToken = async (payload: Payload): Promise<string> => {
    const token = await this.jwt.generateToken(payload, '1h');

    if (!token) throw new WrongAuthenticationTokenException();
    return token;
  };

  private generatePayload = (user: UserDto): Payload => {
    const permissions = [...new Set(user.roles.flatMap((item) => item.permissions))];

    const payload = { id: user.id, permissions };

    return payload;
  };

  login = async (email: string, password: string): Promise<string> => {
    this.validate(email, password);

    const userDto = await this.sigIn(email, password);

    const payload = this.generatePayload(userDto);

    const token = this.generateToken(payload);

    return token;
  };
}
