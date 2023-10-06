import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { WrongAuthenticationTokenException } from '../../../core/errors';
import { BaseController, PaginatedResult } from '../Base';
import { Login as LoginUseCase } from '../../../core/useCases/Login';
import { Hash } from '../../../core/services/Hash';
import { JsonWebToken } from '../../../core/services/JsonWebToken';
import { UserPostgres } from '../../repositories/sequelize/User';

export class Login extends BaseController {
  private readonly loginUseCase: LoginUseCase;
  constructor() {
    super();
    this.loginUseCase = new LoginUseCase(new UserPostgres(), new Hash(bcrypt), new JsonWebToken(jwt));
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
  async handle(req: Request, next: NextFunction): Promise<PaginatedResult | void> {
    try {
      const { email, password } = req.body;

      const token = await this.loginUseCase.login(email, password);

      if (!token) throw new WrongAuthenticationTokenException();

      return this.paginate({ token },req);
    } catch (error) {
      next(error);
    }
  }
}
