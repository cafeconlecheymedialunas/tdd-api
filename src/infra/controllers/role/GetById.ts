import { NextFunction, Request, Response } from 'express';
import { RoleCrud } from '../../../core/useCases/RoleCrud';
import { Role as RolePostgres } from '../../repositories/sequelize/Role';

export class getById {
  private readonly roleCrudUseCase: RoleCrud;
  constructor() {

    this.roleCrudUseCase = new RoleCrud(new RolePostgres());
  }
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const roles = await this.roleCrudUseCase.getById(req);

      res.json(roles);
    } catch (error) {
      next(error);
    }
  }
}
