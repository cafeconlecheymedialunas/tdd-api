import { UserRepositoryInterface } from '../../domain/interfaces/repositories/UserRepositoryInterface';
import { HashPasswordServiceInterface } from '../../domain/interfaces/services/HashPasswordServiceInterface';
import { JsonWebTokenServiceInterface } from '../../domain/interfaces/services/JsonWebTokenServiceInterface';
import {
  ValidationException,
  WrongAuthenticationTokenException,
  WrongCredentialsException,
} from '../../domain/types/errors';
import { Payload } from '../../domain/types/response';
import { UserDto } from '../dtos/UserDto';
import { Condition } from '../../domain/types/requestParams';
import { validateEmail } from '../../infraestructure/utils';

export class LoginUseCase {
  private readonly repository: UserRepositoryInterface;
  private readonly hashService: HashPasswordServiceInterface;
  private readonly jwt: JsonWebTokenServiceInterface;

  constructor({
    repository,
    hashService,
    jwt,
  }: {
    repository: UserRepositoryInterface;
    hashService: HashPasswordServiceInterface;
    jwt: JsonWebTokenServiceInterface;
  }) {
    this.repository = repository;

    this.hashService = hashService;

    this.jwt = jwt;
  }

  validate(email: string, password: string): void {
    const errors = [];

    if (!email) {
      errors.push({ key: 'email', error: 'Email is required' });
    }
    if (typeof email !== 'string') {
      errors.push({ key: 'email', error: 'Email must be a string' });
    }

    if (!validateEmail(email)) {
      errors.push({ key: 'email', error: 'This Is not a valid Email' });
    }

    if (!password) {
      errors.push({ key: 'password', error: 'Password is required' });
    }
    if (typeof password !== 'string') {
      errors.push({ key: 'email', error: 'Email must be a string' });
    }
    if (errors.length > 0) throw new ValidationException(errors);
  }

  private async sigIn(email: string, password: string): Promise<UserDto> {
    this.validate(email, password);
    const conditions = [{ key: 'email', condition: Condition.Equal, value: email }];

    const users = await this.repository.filter(conditions);

    if (users.length === 0) throw new WrongCredentialsException();

    const passwordMatch = await this.hashService.verify(password, users[0].password);

    if (!passwordMatch) {
      throw new WrongCredentialsException();
    }

    return users[0];
  }

  private async generateToken(payload: Payload): Promise<string> {
    const token = await this.jwt.generateToken(payload, '1h');

    if (!token) throw new WrongAuthenticationTokenException();
    return token;
  }

  private generatePayload(user: UserDto): Payload {
    const permissions = [...new Set(user.roles.flatMap((item) => item.permissions))];

    const payload = { id: user.id, permissions };

    return payload;
  }

  async login(email: string, password: string): Promise<string> {
    this.validate(email, password);

    const userDto = await this.sigIn(email, password);

    const payload = this.generatePayload(userDto);

    const token = this.generateToken(payload);

    return token;
  }
}
