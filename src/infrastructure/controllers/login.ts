import { WrongAuthenticationTokenException } from '../../domain/types/errors';
import { UserDataMapper } from '../../application/mappers/User';
import { Role as RoleDataMapper } from '../../application/mappers/Role';
import { Permission as PermissionDataMapper } from '../../application/mappers/Permission';
import { JsonWebToken } from '../../application/services/JsonWebToken';
import { HashPassword } from '../../application/services/HashPassword';
import { Login } from '../../application/useCases/Login';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { response } from '../utils';
import { UserMock } from '../repositories/UserMock';
import { PermissionMock } from '../repositories/PermissionMock';
import { RoleMock } from '../repositories/RoleMock';
import { Validator } from '../../application/services/Validator';

const loginUseCase = new Login(
  new UserMock(new UserDataMapper(new RoleMock(new RoleDataMapper(new PermissionMock(new PermissionDataMapper()))))),
  new HashPassword(bcrypt),
  new JsonWebToken(jwt),
  new Validator(),
);

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    loginUseCase.validate(email, password);

    const token = await loginUseCase.login(email, password);

    if (!token) throw new WrongAuthenticationTokenException();

    response(res, 200, { token });
  } catch (error) {
    next(error);
  }
};

export default login;
