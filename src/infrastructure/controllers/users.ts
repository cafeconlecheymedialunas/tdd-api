import { NextFunction, Request, Response } from 'express';
import { response } from '../../infrastructure/utils';
import { GetAllUsers } from '../../application/useCases/GetAllUsers';
import { User as UserDataMapper } from '../../application/mappers/User';
import { Role as RoleDataMapper } from '../../application/mappers/Role';
import { Permission as PermissionDataMapper } from '../../application/mappers/Permission';
import { UserMock } from '../../infrastructure/repositories/UserMock';
import { RoleMock } from '../../infrastructure/repositories/RoleMock';
import { PermissionMock } from '../../infrastructure/repositories/PermissionMock';
import { Mock } from '../../infrastructure/repositories/Mock';
import { User as UserEntity } from '../../domain/entities/User';

const getAllUsersUseCase = new GetAllUsers(
  new UserMock(
    new UserDataMapper(new RoleMock(new RoleDataMapper(new PermissionMock(new PermissionDataMapper())))),
    new Mock<UserEntity>(),
  ),
);

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
