import { NextFunction, Request, Response } from 'express';
import { RoleCrud } from '../../../core/useCases/RoleCrud';
import { BaseController, PaginatedResult } from '../Base';
import { RolePostgres } from '../../repositories/sequelize/Role';

export class getById extends BaseController {
  private readonly roleCrudUseCase: RoleCrud;
  constructor() {
    super();
    this.roleCrudUseCase = new RoleCrud(new RolePostgres());
  }
  async handle(req: Request, next: NextFunction): Promise<PaginatedResult | void> {
    try {
      const { id, name } = req.body;
      const roles = await this.roleCrudUseCase.getById(id);

      return this.paginate(roles,req);
    } catch (error) {
      next(error);
    }
  }
}
