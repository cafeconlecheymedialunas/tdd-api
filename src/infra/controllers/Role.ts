import { NextFunction, Request, Response } from 'express';
import { response } from '../utils';
import { RoleCrud } from 'core/useCases/RoleCrud';
import { BaseController, PaginatedResult } from './Base';
import { RolePostgres } from 'infra/repositories/sequelize/Role';



export class Role extends BaseController {

  private readonly roleCrudUseCase:RoleCrud
  constructor(){
    super()
    this.roleCrudUseCase = new RoleCrud(
      new RolePostgres()
     );
  }
  getAll = async (req: Request, res: Response, next: NextFunction): Promise<PaginatedResult | void> => {
    try {
      const roles = await this.roleCrudUseCase.getAll();

      if (!roles) response(res, 200, []);

      return this.paginate(roles, req);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<PaginatedResult | void> => {
    try {
      const { id, name } = req.body;
      const roles = await this.roleCrudUseCase.getById(id);

      if (!roles) response(res, 200, []);

      return this.paginate(roles, req);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<PaginatedResult | void> => {
    try {
      const { id, role } = req.body;
      const roles = await this.roleCrudUseCase.update(id,role);

      if (!roles) response(res, 200, []);

      return this.paginate(roles, req);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<PaginatedResult | void> => {
    try {
      const { id} = req.body;
      const roles = await this.roleCrudUseCase.delete(id);

      if (!roles) response(res, 200, []);

      return this.paginate(roles, req);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<PaginatedResult | void> => {
    try {
      const { name,permissions } = req.body;
      const roles = await this.roleCrudUseCase.create({name:name,permissions:permissions});

      if (!roles) response(res, 200, []);

      return this.paginate(roles, req);
    } catch (error) {
      next(error);
    }
  };
}
