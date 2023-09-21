import { WrongCredentialsException } from '../../core/types/errors';
import { Request, Response, NextFunction } from 'express';
import { response } from '../utils';
import { Registerable } from 'core/interfaces/useCases/Registerable';
import { BaseController, PaginatedResult } from './Base';

export class RegisterUser extends BaseController {
  private readonly registerUseCase: Registerable;

  constructor(registerUseCase: Registerable) {
    super();
    this.registerUseCase = registerUseCase;
  }

  /**
   * Registers a new user with the provided name, email, password, and roles.
   * @param {Request} req - The Request Express containing the user's information.
   * @param {Response} res - The Response Express to send the result to.
   * @param {NextFunction} next - The next function to call in the middleware chain.
   * @returns {Promise<void>} - A promise that resolves when the registration is complete.
   * @throws {WrongCredentialsException} - If the registration fails.
   */
  handle = async (req: Request, res: Response, next: NextFunction): Promise<PaginatedResult | void > => {
    try {
      const { name, email, password, roles } = req.body;
      const result = await this.registerUseCase.register({ name, email, password, roles });
      if (!result) throw new WrongCredentialsException();
      return  this.paginate(result,req);
    
    } catch (error) {
      next(error);
    }
  };
}

export default RegisterUser;
