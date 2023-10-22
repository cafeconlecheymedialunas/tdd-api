import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { WrongAuthenticationTokenException } from '../../../core/errors';
import { Login as LoginUseCase } from '../../../core/useCases/Login';
import { Hash } from '../../../core/services/Hash';
import { JsonWebToken } from '../../../core/services/JsonWebToken';
import { User as UserPostgres } from '../../repositories/sequelize/User';

export class Login {
  private readonly loginUseCase: LoginUseCase;
  constructor() {
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
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {


      const token = await this.loginUseCase.login(req);

      if (!token) throw new WrongAuthenticationTokenException();

      res.json({ token })
    } catch (error) {
      next(error);
    }
  }
}
