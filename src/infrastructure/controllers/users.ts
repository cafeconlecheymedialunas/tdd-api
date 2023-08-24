import { NextFunction, Request, Response } from 'express';
import { response } from '#root/infrastructure/utils';
import { GetAllUsers } from '#root/application/useCases/GetAllUsers';
import { User as UserDataMapper } from '#root/application/mappers/User';
import { Role as RoleDataMapper } from '#root/application/mappers/Role';
import { Permission as PermissionDataMapper } from '#root/application/mappers/Permission';
import { UserMock } from '#root/infrastructure/repositories/UserMock';
import { RoleMock } from '#root/infrastructure/repositories/RoleMock';
import { PermissionMock } from '#root/infrastructure/repositories/PermissionMock';
import { Mock } from '#root/infrastructure/repositories/Mock';
import { User as UserEntity } from '#root/domain/entities/User';

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
