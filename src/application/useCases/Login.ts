import { Userable } from '../../domain/interfaces/repositories/Userable';
import { Hashable } from '../../domain/interfaces/services/Hashable';
import { JsonWebTokenable } from '../../domain/interfaces/services/JsonWebTokenable';
import {
  ValidationException,
  WrongAuthenticationTokenException,
  WrongCredentialsException,
} from '../../domain/types/errors';
import { Payload } from '../../domain/types/responseOutputs';
import { User, User as UserDto } from '../../application/dtos/User';
import { Condition } from '../../domain/types/requestInputs';
import { Validatorable } from '../../domain/interfaces/services/Validatorable';
import { RULES } from '../../domain/types/validationRules';
import { Permission as PermissionDto } from '../dtos/Permission';

export class Login {
  private readonly UserRepository: Userable;
  private readonly hashService: Hashable;
  private readonly JsonWebTokenService: JsonWebTokenable;
  private readonly validatorService: Validatorable;

  constructor(
    UserRepository: Userable,
    hashService: Hashable,
    JsonWebTokenService: JsonWebTokenable,
    validatorService: Validatorable,
  ) {
    this.UserRepository = UserRepository;
    this.hashService = hashService;
    this.JsonWebTokenService = JsonWebTokenService;
    this.validatorService = validatorService;
  }

  /**
   * Validates an email and password using a set of validation rules.
   * @param {string} email - The email to validate.
   * @param {string} password - The password to validate.
   * @throws {ValidationException} If there are any validation errors.
   * @returns {void}
   */
  validate = (email: string, password: string): void => {
    const VALIDATION_RULES = [
      { key: 'email', rules: [RULES.isNotEmpty, RULES.isEmail], value: email },
      { key: 'password', rules: [RULES.isNotEmpty], value: password },
    ];

    const validationErrors = this.validatorService.validate(VALIDATION_RULES);

    if (validationErrors.length > 0) throw new ValidationException(validationErrors);
  };

  /**
   * Sign in a user with the given email and password.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<UserDto>} A promise that resolves to the user object if the sign in is successful.
   */
  signIn = async (email: string, password: string): Promise<UserDto> => {
    this.validate(email, password);

    const user = await this.checkUserEmail(email);

    await this.checkUserPassword(password, user.password);

    return user;
  };

  /**
   * Checks if a user with the provided email exists.
   * @param {string} email - The email to check.
   * @returns {Promise<UserDto>} A promise that resolves to the found user object.
   * @throws {WrongCredentialsException} If the user does not exist.
   */
  checkUserEmail = async (email: string): Promise<UserDto> => {
    const QUERY_FILTER = [{ key: 'email', condition: Condition.Equal, value: email }];

    const users = await this.UserRepository.filter(QUERY_FILTER);

    if (users.length === 0) throw new WrongCredentialsException();

    return users[0];
  };

  /**
   * Checks if the provided password matches the user's password.
   * @param {string} password - The password to check.
   * @param {string} userPassword - The user's hashed password.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating password match.
   * @throws {WrongCredentialsException} If the passwords do not match.
   */
  checkUserPassword = async (password: string, userPassword: string): Promise<boolean> => {
    const passwordMatch = await this.hashService.verify(password, userPassword);

    if (!passwordMatch) {
      throw new WrongCredentialsException();
    }
    return passwordMatch;
  };

  /**
   * Generates an authentication token using the provided payload.
   * @param {Payload} payload - The payload object containing the data to be encoded in the token.
   * @returns {Promise<string>} A promise that resolves to the generated token.
   * @throws {WrongAuthenticationTokenException} If the token generation fails.
   */
  generateToken = async (payload: Payload): Promise<string> => {
    const token = await this.JsonWebTokenService.generateToken(payload, '1h');

    if (!token) throw new WrongAuthenticationTokenException();
    return token;
  };

  /**
   * Generates a payload object based on the provided UserDto.
   * @param {UserDto} user - The user object to generate the payload from.
   * @returns {Payload} The generated payload object.
   */
  generatePayload = (user: UserDto): Payload => {
    let permissions = [...new Set(user.roles.flatMap((item) => item.permissions))];

    let payload = { id: user.id, permissions };

    return payload;
  };

  /**
   * Handles the login process for a user with the provided email and password.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<string>} A promise that resolves to the authentication token on successful login.
   */
  login = async (email: string, password: string): Promise<string> => {
    this.validate(email, password);

    const userDto = await this.signIn(email, password);

    const payload = this.generatePayload(userDto);

    const token = await this.generateToken(payload);

    return token;
  };
}
