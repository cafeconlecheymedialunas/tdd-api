import { WrongCredentialsException } from '../../../core/errors';
import { Request, Response, NextFunction } from 'express';
import { Register as RegisterUseCase } from '../../../core/useCases/Register';
import { Hash } from '../../../core/services/Hash';
import bcrypt from 'bcrypt';
import { User as UserPostgres } from '../../repositories/sequelize/User';

export class Register {
  private readonly registerUseCase: RegisterUseCase;

  constructor() {
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
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const result = await this.registerUseCase.register(req);
      if (!result) throw new WrongCredentialsException();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
