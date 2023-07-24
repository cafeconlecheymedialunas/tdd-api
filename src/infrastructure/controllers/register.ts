import { ClientException } from '../../domain/types/errors';
import { UserDataMapper } from '../../application/mappers/User';
import { Role as RoleDataMapper } from '../../application/mappers/Role';
import { Permission as PermissionDataMapper } from '../../application/mappers/Permission';
import { HashPassword } from '../../application/services/HashPassword';
import { Register } from '../../application/useCases/Register';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { response } from '../utils';
import { UserMock } from '../repositories/UserMock';
import { RoleMock } from '../repositories/RoleMock';
import { PermissionMock } from '../repositories/PermissionMock';
import { Validator } from '../../application/services/Validator';

const registerUseCase = new Register(
  new UserMock(new UserDataMapper(new RoleMock(new RoleDataMapper(new PermissionMock(new PermissionDataMapper()))))),
  new HashPassword(bcrypt),
  new Validator(),
);

const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, roles } = req.body;

    const result = await registerUseCase.register({ name, email, password, roles });

    if (!result) throw new ClientException();

    return response(res, 200, result);
  } catch (error) {
    next(error);
  }
};

export default register;
