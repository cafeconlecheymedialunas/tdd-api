import { Userable } from '../interfaces/repositories/auth/Userable';
import { Hashable } from '../interfaces/services/Hashable';
import { UserWithThatEmailAlreadyExistsException } from '../errors';
import { UserRequestParams } from '../types/requestInputs';
import { User as UserEntity } from '../entities/auth/User';
import { Operations, QueryFilter } from '../types/database';
import { Email } from '../entities/auth/Email';
import { Password } from '../entities/auth/Password';

export class Register {
  private readonly userRepository: Userable;
  private readonly hashService: Hashable;

  constructor(userRepository: Userable, hashService: Hashable) {
    this.userRepository = userRepository;

    this.hashService = hashService;
  }

  /**
   * Checks if a user with the given email already exists in the repository.
   * Throws an exception if a user with the same email is found.
   * @param {string} email - The email to check for existence.
   * @returns {Promise<void>} - A promise that resolves if no user with the same email is found.
   * @throws {UserWithThatEmailAlreadyExistsException} - If a user with the same email is found.
   */
  async userExist(email: Email): Promise<void> {
    const whereClause: QueryFilter = {
      email: {
        [Operations.eq]: email.getValue(),
      },
    };
    const userExist = await this.userRepository.filter(whereClause);

    if (userExist.length > 0) throw new UserWithThatEmailAlreadyExistsException(email);
  }

  /**
   * Generates a hash for the given password using a Hash services.
   * @param {string} password - The password to generate a hash for.
   * @returns {Promise<string>} A promise that resolves to the generated hash.
   * @throws {ClientException} If the password hash is not generated successfully.
   */
  async generateHash(password: Password): Promise<string> {
    const hashedPassword = await this.hashService.hash(password);

    return hashedPassword;
  }

  /**
   * Registers a new user with the provided user information, hashing the password, and checking if the user already exists.
   * @param {UserRequestParams} user - The user information, including email, password, and name.
   * @returns {Promise<UserEntity | false>} - A promise that resolves to the newly registered user object or false if registration fails.
   */
  async register(user: UserRequestParams): Promise<UserEntity | false> {
    const { email, password, firstName, lastName } = user;

    await this.userExist(new Email(email));

    const hashedPassword = await this.generateHash(new Password(password));

    user.password = hashedPassword;

    const newUser = await this.userRepository.create(user);

    return newUser;
  }
}
