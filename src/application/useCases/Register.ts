import { UserMockable } from '../../domain/interfaces/repositories/UserMockable';
import { Hashable } from '../../domain/interfaces/services/Hashable';
import { Validatorable } from '../../domain/interfaces/services/Validatorable';
import { Registerable } from '../../domain/interfaces/useCases/Registerable';
import { UserWithThatEmailAlreadyExistsException, ValidationException } from '../../domain/types/errors';
import { UserRequestParams } from '../../domain/types/requestInputs';
import { Condition } from '../../domain/types/requestInputs';
import { RULES } from '../../domain/types/validationRules';
import { User as UserDto } from '../dtos/User';

export class Register implements Registerable {
  private readonly userRepository: UserMockable;
  private readonly hashService: Hashable;
  private readonly validatorService: Validatorable;

  constructor(userRepository: UserMockable, hashService: Hashable, validatorService: Validatorable) {
    this.userRepository = userRepository;

    this.hashService = hashService;

    this.validatorService = validatorService;
  }

  /**
   * Validates the provided email, password, and name using a set of ValidationRules Type Array.
   * @param {string} email - The email to validate.
   * @param {string} password - The password to validate.
   * @param {string} name - The name to validate.
   * @throws {ValidationException} - If has validation errors.
   * @returns None
   */
  validate = (email: string, password: string, name: string): void => {
    const VALIDATION_RULES = [
      { key: 'email', rules: [RULES.isNotEmpty, RULES.isString, RULES.isEmail], value: email },
      { key: 'password', rules: [RULES.isNotEmpty, RULES.isStrongPassword], value: password },
      { key: 'name', rules: [RULES.isNotEmpty, RULES.isString], value: name },
    ];

    const validationErrors = this.validatorService.validate(VALIDATION_RULES);

    if (validationErrors.length > 0) throw new ValidationException(validationErrors);
  };

  /**
   * Checks if a user with the given email already exists in the repository.
   * Throws an exception if a user with the same email is found.
   * @param {string} email - The email to check for existence.
   * @returns {Promise<void>} - A promise that resolves if no user with the same email is found.
   * @throws {UserWithThatEmailAlreadyExistsException} - If a user with the same email is found.
   */
  userExist = async (email: string): Promise<void> => {
    const QUERY_FILTER = [{ key: 'email', condition: Condition.Equal, value: email }];

    const userExist = await this.userRepository.filter(QUERY_FILTER);

    if (userExist.length > 0) throw new UserWithThatEmailAlreadyExistsException(email);
  };

  /**
   * Generates a hash for the given password using a Hash services.
   * @param {string} password - The password to generate a hash for.
   * @returns {Promise<string>} A promise that resolves to the generated hash.
   * @throws {ClientException} If the password hash is not generated successfully.
   */
  generateHash = async (password: string): Promise<string> => {
    const hashedPassword = await this.hashService.hash(password);

    return hashedPassword;
  };

  /**
   * Registers a new user with the provided user information, hashing the password, and checking if the user already exists.
   * @param {UserRequestParams} user - The user information, including email, password, and name.
   * @returns {Promise<UserDto | false>} - A promise that resolves to the newly registered user object or false if registration fails.
   */
  register = async (user: UserRequestParams): Promise<UserDto | false> => {
    const { email, password, name } = user;

    this.validate(email, password, name);

    await this.userExist(email);

    const hashedPassword = await this.generateHash(password);

    user.password = hashedPassword;

    const newUser = await this.userRepository.add(user);

    return newUser;
  };
}
