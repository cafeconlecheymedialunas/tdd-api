import { NextFunction, Request, Response } from 'express';
import { PermissionCrud } from '../../../core/useCases/PermissionCrud';
import { BaseController, PaginatedResult } from '../Base';
import { PermissionPostgres } from '../../repositories/sequelize/Permission';

export class getById extends BaseController {
  private readonly permissionCrudUseCase: PermissionCrud;
  constructor() {
    super();
    this.permissionCrudUseCase = new PermissionCrud(new PermissionPostgres());
  }

  async handle(req: Request,  next: NextFunction): Promise<PaginatedResult | void> {
    try {
      const { id } = req.body;
      const permissions = await this.permissionCrudUseCase.getById(id);

      return this.paginate(permissions);
    } catch (error) {
      next(error);
    }
  };
}
