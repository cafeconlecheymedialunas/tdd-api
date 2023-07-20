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

const hashPasswordService = new HashPasswordService(bcrypt);

const userRepository = new UserMockRepository(
  new UserDataMapper(
    new RoleMockRepository(new RoleDataMapper(new PermissionMockRepository(new PermissionDataMapper()))),
  ),
);

const loginUseCase = new LoginUseCase({
  repository: userRepository,
  hashService: hashPasswordService,
  jwt: new JsonWebTokenService(jwt),
});

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
