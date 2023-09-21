import { WrongAuthenticationTokenException } from '../../core/types/errors';
import { Request, Response, NextFunction } from 'express';
import { response } from '../utils';
import { Loginable } from 'core/interfaces/useCases/Loginable';
import { BaseController, PaginatedResult } from './Base';
class LoginUser extends BaseController {
  private readonly loginUseCase: Loginable;
  constructor(loginUseCase: Loginable) {
    super();
    this.loginUseCase = loginUseCase;
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

      return this.paginate({ token },req);

    } catch (error) {
      next(error);
    }

  };
}

export default LoginUser;
