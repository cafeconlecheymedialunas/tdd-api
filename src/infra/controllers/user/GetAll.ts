import { NextFunction, Request, Response } from 'express';
import { UserCrud } from '../../../core/useCases/UserCrud';
import { BaseController } from '../Base';
import { User as UserPostgres } from '../../repositories/sequelize/User';

export class GetAll {
  private readonly crudUserUseCase: UserCrud;
  constructor() {
    this.crudUserUseCase = new UserCrud(new UserPostgres());
  }
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await this.crudUserUseCase.getAll();

      res.json(users);
    } catch (error) {
      next(error);
    }
  }
}
