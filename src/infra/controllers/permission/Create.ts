import { NextFunction, Request, Response } from 'express';
import { PermissionCrud } from '../../../core/useCases/PermissionCrud';
import { BaseController, PaginatedResult } from '../Base';
import { PermissionPostgres } from '../../repositories/sequelize/Permission';
import { Permission } from 'core/entities/auth/Permission';

export class Create extends BaseController {
  private readonly permissionCrudUseCase: PermissionCrud;
  constructor() {
    super();
    this.permissionCrudUseCase = new PermissionCrud(new PermissionPostgres());
  }

  async handle(req: Request, next: NextFunction): Promise<PaginatedResult | void> {
    try {
      const { route, method } = req.body;
      const permissions = await this.permissionCrudUseCase.create({ route, method });

      return this.paginate(permissions,req);
    } catch (error) {
      next(error);
    }
  }
}
