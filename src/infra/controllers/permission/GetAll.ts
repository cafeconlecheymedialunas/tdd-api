import { NextFunction, Request, Response } from 'express';
import { PermissionCrud } from '../../../core/useCases/PermissionCrud';
import { Permission as PermissionPostgres } from '../../repositories/sequelize/Permission';

export class GetAll {
  private readonly permissionCrudUseCase: PermissionCrud;
  constructor() {
    this.permissionCrudUseCase = new PermissionCrud(new PermissionPostgres());
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const permissions = await this.permissionCrudUseCase.getAll();

      res.json(permissions);
    } catch (error) {
      next(error);
    }
  }
}
