import { NextFunction, Request, Response } from 'express';
import { response } from '../utils';
import { PermissionCrud } from 'core/useCases/PermissionCrud';
import { BaseController, PaginatedResult } from './Base';
import { PermissionPostgres } from 'infra/repositories/sequelize/Permission';



export class Permission extends BaseController {

  private readonly permissionCrudUseCase:PermissionCrud
  constructor(){
    super()
    this.permissionCrudUseCase = new PermissionCrud(
      new PermissionPostgres()
     );
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<PaginatedResult | void> => {
    try {
      const { route,method } = req.body;
      const permissions = await this.permissionCrudUseCase.create({route,method});

      if (!permissions) response(res, 200, []);

      return this.paginate(permissions, req);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<PaginatedResult | void> => {
    try {
      const permissions = await this.permissionCrudUseCase.getAll();

      if (!permissions) response(res, 200, []);

      return this.paginate(permissions, req);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<PaginatedResult | void> => {
    try {
      const { id } = req.body;
      const permissions = await this.permissionCrudUseCase.getById(id);

      if (!permissions) response(res, 200, []);

      return this.paginate(permissions, req);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<PaginatedResult | void> => {
    try {
      const { id, permission } = req.body;
      const permissions = await this.permissionCrudUseCase.update(id,permission);

      if (!permissions) response(res, 200, []);

      return this.paginate(permissions, req);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<PaginatedResult | void> => {
    try {
      const { id} = req.body;
      const permissions = await this.permissionCrudUseCase.delete(id);

      if (!permissions) response(res, 200, []);

      return this.paginate(permissions, req);
    } catch (error) {
      next(error);
    }
  };
}
