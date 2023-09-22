import { WrongAuthenticationTokenException } from '../../core/errors';
import { Request, Response, NextFunction } from 'express';

import { BaseController, PaginatedResult } from './Base';
import { Login } from 'core/useCases/Login';
import { User } from 'infra/repositories/mock/User';
import { Mock } from 'infra/repositories/mock/Mock';
import { User as UserEntity } from 'core/entities/auth/User';
import { Role } from 'infra/repositories/mock/Role';
import { Permission } from 'infra/repositories/mock/Permission';
import { Hash } from 'core/services/Hash';
import { JsonWebToken } from 'core/services/JsonWebToken';
import { Validator } from 'core/services/Validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class LoginUser extends BaseController {
  private readonly loginUseCase: Login;
  constructor() {
    super();
    this.loginUseCase = new Login(
      new User(new Mock<UserEntity>(), new Role(new Permission())),
      new Hash(bcrypt),
      new JsonWebToken(jwt),
      new Validator(),
    );
  }
  /**
   * Handles the login functionality by validating the email and password,
   * generating a token, and sending the token in the response.
   * @param {Request} req - The Request Expres .
   * @param {Response} res - The Response Expres .
   * @param {NextFunction} next - The NextFunction Expres.
   * @returns {Promise<void>} - A promise that resolves when the login process is complete.
   * @throws {WrongAuthenticationTokenException} - If the authentication token is invalid.
   */
  handle = async (req: Request, res: Response, next: NextFunction): Promise<PaginatedResult | void> => {
    try {
      const { email, password } = req.body;

      this.loginUseCase.validate(email, password);

      const token = await this.loginUseCase.login(email, password);

      if (!token) throw new WrongAuthenticationTokenException();

      return this.paginate({ token }, req);
    } catch (error) {
      next(error);
    }
  };
}

export default LoginUser;
