import { WrongAuthenticationTokenException } from '../../domain/types/errors';
import { UserDataMapper } from '../../application/datamappers/User';
import { RoleDataMapper } from '../../application/datamappers/Role';
import { PermissionDataMapper } from '../../application/datamappers/Permission';
import { JsonWebTokenService } from '../../application/services/JsonWebToken';
import { HashPasswordService } from '../../application/services/HashPassword';
import { LoginUseCase } from '../../application/useCases/Login';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { response } from '../utils';
import { UserMockRepository } from '../repositories/UserMockRepository';
import { PermissionMockRepository } from '../repositories/PermissionMockRepository';
import { RoleMockRepository } from '../repositories/RoleMockRepository';
import { ValidatorService } from '../../application/services/Validator';

const loginUseCase = new LoginUseCase(
  new UserMockRepository(
    new UserDataMapper(
      new RoleMockRepository(new RoleDataMapper(new PermissionMockRepository(new PermissionDataMapper()))),
    ),
  ),
  new HashPasswordService(bcrypt),
  new JsonWebTokenService(jwt),
  new ValidatorService(),
);

const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

export default loginController;
