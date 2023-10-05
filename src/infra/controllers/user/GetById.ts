import { NextFunction, Request, Response } from 'express';
import { UserCrud } from '../../../core/useCases/UserCrud';
import { BaseController, PaginatedResult } from '../Base';
import { UserPostgres } from '../../repositories/sequelize/User';

export class getById extends BaseController {
  private readonly crudUserUseCase: UserCrud;
  constructor() {
    super();
    this.crudUserUseCase = new UserCrud(new UserPostgres());
  }

  async handle(req: Request, next: NextFunction): Promise<PaginatedResult | void> {
    try {
      const { id, name } = req.body;
      const users = await this.crudUserUseCase.getById(id);

      return this.paginate(users);
    } catch (error) {
      next(error);
    }
  }
}
