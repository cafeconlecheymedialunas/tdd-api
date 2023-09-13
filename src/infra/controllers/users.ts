import { NextFunction, Request, Response } from 'express';
import { response } from '../utils';
import { GetAllUsers } from '../../core/useCases/GetAllUsers';
import { UserMock } from '../repositories/UserMock';
import { RoleMock } from '../repositories/RoleMock';
import { PermissionMock } from '../repositories/PermissionMock';
import { Mock } from '../repositories/Mock';
import { User as UserEntity } from '../../core/entities/User';

const getAllUsersUseCase = new GetAllUsers(new UserMock(new Mock<UserEntity>(), new RoleMock(new PermissionMock())));

const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await getAllUsersUseCase.run();

    if (!users) response(res, 200, []);

    return response(res, 200, users);
  } catch (error) {
    next(error);
  }
};

export default getAllUsers;
