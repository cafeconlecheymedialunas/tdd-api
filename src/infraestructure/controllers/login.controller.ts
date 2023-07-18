import { Request, Response } from 'express';

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import { LoginUseCase } from '../../application/useCases/LoginUseCase';

import { UserMockRepository } from '../repositories/UserMockRepository';

import { JsonWebTokenService } from '../../application/services/JsonWebTokenService';

import { HashPasswordService } from '../../application/services/HashPasswordService';

import { WrongAuthenticationTokenException } from '../../domain/types/response';

import { UserDtoMapper } from '../../application/datamappers/UserDtoMapper';

import { RoleMockRepository } from '../repositories/RoleMockRepository';

import { RoleDtoMapper } from '../../application/datamappers/RoleDtoMapper';

import { PermissionMockRepository } from '../repositories/PermissionMockRepository';

import { PermissionDtoMapper } from '../../application/datamappers/PermissionDtoMapper';
import { response } from '../utils';
import { NextFunction } from 'connect';

const hashPasswordService = new HashPasswordService(bcrypt);

const userRepository = new UserMockRepository(
  new UserDtoMapper(new RoleMockRepository(new RoleDtoMapper(new PermissionMockRepository(new PermissionDtoMapper())))),
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
