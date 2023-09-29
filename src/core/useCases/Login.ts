import { Userable } from '../interfaces/repositories/auth/Userable';
import { Hashable } from '../interfaces/services/Hashable';
import { JsonWebTokenable } from '../interfaces/services/JsonWebTokenable';
import { Payload } from '../types/responseOutputs';
import { User as UserEntity } from '../entities/auth/User';
import { Role as RoleEntity } from '../entities/auth/Role';
import { Operations, QueryFilter } from '../types/database';
import { WrongAuthenticationTokenException, WrongCredentialsException } from '../errors';
import { Email } from '../entities/auth/Email';
import { Password } from '../entities/auth/Password';

export class Login {
  private readonly UserRepository: Userable;
  private readonly hashService: Hashable;
  private readonly JsonWebTokenService: JsonWebTokenable;

  constructor(UserRepository: Userable, hashService: Hashable, JsonWebTokenService: JsonWebTokenable) {
    this.UserRepository = UserRepository;
    this.hashService = hashService;
    this.JsonWebTokenService = JsonWebTokenService;
  }

  /**
   * Sign in a user with the given email and password.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<UserEntity>} A promise that resolves to the user object if the sign in is successful.
   */
  async signIn (email: Email, password: Password): Promise<UserEntity>{
    const user = await this.checkUserEmail(email);

    await this.checkUserPassword(password, user.getPassword());

    return user;
  };

  /**
   * Checks if a user with the provided email exists.
   * @param {string} email - The email to check.
   * @returns {Promise<UserEntity>} A promise that resolves to the found user object.
   * @throws {WrongCredentialsException} If the user does not exist.
   */
  async checkUserEmail (email: Email): Promise<UserEntity> {
    const whereClause: QueryFilter = {
      email: {
        [Operations.eq]: email.getValue(),
      },
    };

    const users = await this.UserRepository.filter(whereClause);

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
  async checkUserPassword(password: Password, userPassword: Password): Promise<boolean>  {
    const passwordMatch = await this.hashService.verify(password, userPassword.getValue());

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
  async generateToken (payload: Payload): Promise<string>  {
    const token = await this.JsonWebTokenService.generateToken(payload, '1h');

    if (!token) throw new WrongAuthenticationTokenException();
    return token;
  };

  /**
   * Generates a payload object based on the provided UserEntity.
   * @param {UserEntity} user - The user object to generate the payload from.
   * @returns {Payload} The generated payload object.
   */
  generatePayload (user: UserEntity): Payload {
    const permissions = [...new Set(user.getRoles().flatMap((item: RoleEntity) => item.getPermissions()))];

    const payload = { email: user.getEmail(), permissions };

    return payload;
  };

  /**
   * Handles the login process for a user with the provided email and password.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<string>} A promise that resolves to the authentication token on successful login.
   */
  async login(email: Email, password: Password): Promise<string> {
    const userEntity = await this.signIn(email, password);

    const payload = this.generatePayload(userEntity);

    const token = await this.generateToken(payload);

    return token;
  };
}
