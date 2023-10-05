import { NextFunction, Request, Response } from 'express';
import { RoleCrud } from '../../../core/useCases/RoleCrud';
import { BaseController, PaginatedResult } from '../Base';
import { RolePostgres } from '../../repositories/sequelize/Role';

export class Create extends BaseController {
  private readonly roleCrudUseCase: RoleCrud;
  constructor() {
    super();
    this.roleCrudUseCase = new RoleCrud(new RolePostgres());
  }

  async handle(req: Request, next: NextFunction): Promise<PaginatedResult | void> {
    try {
      const { name, permissions } = req.body;
      const roles = await this.roleCrudUseCase.create({ name: name, permissions: permissions });

      return this.paginate(roles);
    } catch (error) {
      next(error);
    }
  }
}
