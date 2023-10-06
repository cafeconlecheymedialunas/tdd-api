import { WrongCredentialsException } from '../../../core/errors';
import { Request, Response, NextFunction } from 'express';

import { BaseController, PaginatedResult } from '../Base';
import { Register as RegisterUseCase } from '../../../core/useCases/Register';
import { Hash } from '../../../core/services/Hash';
import bcrypt from 'bcrypt';
import { UserPostgres } from '../../repositories/sequelize/User';

export class Register extends BaseController {
  private readonly registerUseCase: RegisterUseCase;

  constructor() {
    super();
    this.registerUseCase = new RegisterUseCase(new UserPostgres(), new Hash(bcrypt));
  }

  /**
   * Registers a new user with the provided name, email, password, and roles.
   * @param {Request} req - The Request Express containing the user's information.
   * @param {Response} res - The Response Express to send the result to.
   * @param {NextFunction} next - The next function to call in the middleware chain.
   * @returns {Promise<void>} - A promise that resolves when the registration is complete.
   * @throws {WrongCredentialsException} - If the registration fails.
   */
  async handle(req: Request, next: NextFunction): Promise<PaginatedResult | void> {
    try {
      const { firstName, lastName, email, password, roles } = req.body;
      const result = await this.registerUseCase.register({ firstName, lastName, email, password, roles });
      if (!result) throw new WrongCredentialsException();
      return this.paginate(result,req);
    } catch (error) {
      next(error);
    }
  }
}
