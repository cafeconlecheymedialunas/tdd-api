import { NextFunction, Request, Response } from 'express';
import { UserCrud } from '../../../core/useCases/UserCrud';
import { User as UserPostgres } from '../../repositories/sequelize/User';

export class Delete {
  private readonly crudUserUseCase: UserCrud;
  constructor() {
    this.crudUserUseCase = new UserCrud(new UserPostgres());
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const users = await this.crudUserUseCase.delete(req);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
}
