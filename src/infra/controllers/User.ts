import { NextFunction, Request, Response } from 'express';
import { response } from '../utils';
import { GetAllUsers } from '../../core/useCases/GetAllUsers';
import { UserMock } from '../repositories/UserMock';
import { RoleMock } from '../repositories/RoleMock';
import { PermissionMock } from '../repositories/PermissionMock';
import { Mock } from '../repositories/Mock';
import { User as UserEntity } from '../../core/entities/User';
import { BaseController, PaginatedResult } from './Base';

const getAllUsersUseCase = new GetAllUsers(new UserMock(new Mock<UserEntity>(), new RoleMock(new PermissionMock())));

export class User extends BaseController{

  
  getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<PaginatedResult | void> => {
    try {
      const users = await getAllUsersUseCase.run();
  
      if (!users) response(res, 200, []);

    return this.paginate(users,req);
    } catch (error) {
      next(error);
    }
  };
}



export default User;
