import { Userable } from '../interfaces/repositories/auth/Userable';
import { Hashable } from '../interfaces/services/Hashable';
import { JsonWebTokenable } from '../interfaces/services/JsonWebTokenable';
import { Payload } from '../types/responseOutputs';
import { User as UserEntity } from '../entities/auth/User';
import { Role as RoleEntity } from '../entities/auth/Role';

import { WrongAuthenticationTokenException, WrongCredentialsException } from '../errors';
import { Request } from 'express';
import { Operations } from '../types/database';

export class Login {
  private readonly UserRepository: Userable;
  private readonly hashService: Hashable;
  private readonly JsonWebTokenService: JsonWebTokenable;
  private hashedPassword!: string;
  private password!: string;
  private email!: string;

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
  async signIn(): Promise<UserEntity> {

    const user = await this.checkUserEmail();

    this.hashedPassword = user.getPassword()

    await this.checkUserPassword();

    return user;
  }

  /**
   * Checks if a user with the provided email exists.
   * @returns {Promise<UserEntity>} A promise that resolves to the found user object.
   * @throws {WrongCredentialsException} If the user does not exist.
   */
  async checkUserEmail(): Promise<UserEntity> {
    const whereClauses = {
      [Operations.and]: [
        { email: this.email },
        { password: this.hashedPassword }
      ]
    }
    const users = await this.UserRepository.filter(whereClauses);

    if (!users) throw new WrongCredentialsException();

    return users[0];
  }

  /**
   * Checks if the provided password matches the user's password.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating password match.
   * @throws {WrongCredentialsException} If the passwords do not match.
   */
  async checkUserPassword(): Promise<boolean> {
    const passwordMatch = await this.hashService.verify(this.password, this.hashedPassword);

    if (!passwordMatch) {
      throw new WrongCredentialsException();
    }
    return passwordMatch;
  }

  /**
   * Generates an authentication token using the provided payload.
   * @param {Payload} payload - The payload object containing the data to be encoded in the token.
   * @returns {Promise<string>} A promise that resolves to the generated token.
   * @throws {WrongAuthenticationTokenException} If the token generation fails.
   */
  async generateToken(payload: Payload): Promise<string> {
    const token = await this.JsonWebTokenService.generateToken(payload, '1h');

    if (!token) throw new WrongAuthenticationTokenException();

    return token;
  }

  /**
   * Generates a payload object based on the provided UserEntity.
   * @param {UserEntity} user - The user object to generate the payload from.
   * @returns {Payload} The generated payload object.
   */
  generatePayload(user: UserEntity): Payload {

    const permissions = [...new Set(user.getRoles().flatMap((item: RoleEntity) => item.getPermissions()))];

    const payload = { email: this.email, permissions };

    return payload;
  }

  /**
   * Handles the login process for a user with the provided email and password.
   * @param {req} Request - The Request Express Object
   * @returns {Promise<string>} A promise that resolves to the authentication token on successful login.
   */
  async login(req: Request): Promise<string> {


    const { email, password } = req.body;

    this.email = email;

    this.password = password;

    const userEntity = await this.signIn();

    const payload = this.generatePayload(userEntity);

    const token = await this.generateToken(payload);

    return token;
  }
}
