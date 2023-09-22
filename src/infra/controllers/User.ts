import { NextFunction, Request, Response } from 'express';
import { response } from '../utils';
import { GetAllUsers } from '../../core/useCases/GetAllUsers';
import { User as UserMockRepository } from '../repositories/mock/User';
import { Role as RoleMockRepository } from '../repositories/mock/Role';
import { Permission as permissionMockRepository } from '../repositories/mock/Permission';
import { Mock } from '../repositories/mock/Mock';
import { User as UserEntity } from '../../core/entities/auth/User';
import { BaseController, PaginatedResult } from './Base';

const getAllUsersUseCase = new GetAllUsers(
  new UserMockRepository(new Mock<UserEntity>(), new RoleMockRepository(new permissionMockRepository())),
);

export class User extends BaseController {
  getAll = async (req: Request, res: Response, next: NextFunction): Promise<PaginatedResult | void> => {
    try {
      const users = await getAllUsersUseCase.run();

      if (!users) response(res, 200, []);

      return this.paginate(users, req);
    } catch (error) {
      next(error);
    }
  };
}
