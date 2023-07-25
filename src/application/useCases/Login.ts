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
import { RULES } from '../../domain/types/validationRules';

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

  /**
   * Validates an email and password using a set of ValidationRules Type Array.
   * @param {string} email - The email to validate.
   * @param {string} password - The password to validate.
   * @throws {ValidationException} If there are any validation errors.
   * @returns None
   */
  validate = (email: string, password: string): void => {
    const rules = [
      { key: 'email', rules: [RULES.isNotEmpty, RULES.isEmail], value: email },
      { key: 'password', rules: [RULES.isNotEmpty], value: password },
    ];

    const errors = this.validator.validate(rules);

    if (errors.length > 0) throw new ValidationException(errors);
  };

  /**
   * Sign in a user with the given email and password.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<UserDto>} - A promise that resolves to the user object if the sign in is successful.
   * @throws {WrongCredentialsException} - If the email or password is incorrect.
   */
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

  /**
   * Generates a JWT token using the provided payload.
   * @param {Payload} payload - The payload object containing the data to be encoded in the token.
   * @returns {Promise<string>} A promise that resolves to the generated token.
   * @throws {WrongAuthenticationTokenException} If the token generation fails.
   */
  private generateToken = async (payload: Payload): Promise<string> => {
    const token = await this.jwt.generateToken(payload, '1h');

    if (!token) throw new WrongAuthenticationTokenException();
    return token;
  };

  /**
   * Generates a payload object based on the provided user object,Prevously get unique Users Permissions.
   * @param {UserDto} user - The user object to generate the payload from.
   * @returns {Payload} - The generated payload object.
   */
  private generatePayload = (user: UserDto): Payload => {
    const permissions = [...new Set(user.roles.flatMap((item) => item.permissions))];

    const payload = { id: user.id, permissions };

    return payload;
  };

  /**
   * Logs in a user with the provided email and password.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<string>} - A promise that resolves to a token string.
   * @throws {ValidationException} - If the email or password is invalid.
   * @throws {WrongCredentialsException} - If there is an error during the sign-in process.
   */
  login = async (email: string, password: string): Promise<string> => {
    this.validate(email, password);

    const userDto = await this.sigIn(email, password);

    const payload = this.generatePayload(userDto);

    const token = this.generateToken(payload);

    return token;
  };
}
