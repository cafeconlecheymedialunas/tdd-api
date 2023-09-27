import { NextFunction, Request, Response } from 'express';
import { response } from '../utils';
import { UserCrud } from 'core/useCases/UserCrud';
import { BaseController, PaginatedResult } from './Base';
import { UserPostgres } from 'infra/repositories/sequelize/User';



export class User extends BaseController {

  private readonly crudUserUseCase:UserCrud
  constructor(){
    super()
    this.crudUserUseCase = new UserCrud(
      new UserPostgres()
     );
  }
  getAll = async (req: Request, res: Response, next: NextFunction): Promise<PaginatedResult | void> => {
    try {
      const users = await this.crudUserUseCase.getAll();

      if (!users) response(res, 200, []);

      return this.paginate(users, req);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<PaginatedResult | void> => {
    try {
      const { id, name } = req.body;
      const users = await this.crudUserUseCase.getById(id);

      if (!users) response(res, 200, []);

      return this.paginate(users, req);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<PaginatedResult | void> => {
    try {
      const { id, user } = req.body;
      const users = await this.crudUserUseCase.update(id,user);

      if (!users) response(res, 200, []);

      return this.paginate(users, req);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<PaginatedResult | void> => {
    try {
      const { id} = req.body;
      const users = await this.crudUserUseCase.delete(id);

      if (!users) response(res, 200, []);

      return this.paginate(users, req);
    } catch (error) {
      next(error);
    }
  };
}
