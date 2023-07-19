import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';

import { LoginUseCase } from '../../application/useCases/LoginUseCase';

import { UserMockRepository } from '../repositories/UserMockRepository';

import { JsonWebTokenService } from '../../application/services/JsonWebTokenService';

import { HashPasswordService } from '../../application/services/HashPasswordService';

import { WrongAuthenticationTokenException } from '../../domain/types/errors';

import { UserDataMapper } from '../../application/datamappers/UserDataMapper';

import { RoleMockRepository } from '../repositories/RoleMockRepository';

import { RoleDataMapper } from '../../application/datamappers/RoleDataMapper';

import { PermissionMockRepository } from '../repositories/PermissionMockRepository';

import { PermissionDataMapper } from '../../application/datamappers/PermissionDataMapper';
import { response } from '../utils';
import { NextFunction } from 'connect';
import bcrypt from 'bcrypt';
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

export default async function loginController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;

    loginUseCase.validate(email, password);

    const token = await loginUseCase.login(email, password);

    if (!token) throw new WrongAuthenticationTokenException();

    response(res, 200, { token });
  } catch (error) {
    next(error);
  }
}
