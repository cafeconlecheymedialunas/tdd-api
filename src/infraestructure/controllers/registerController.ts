import { Request, Response, NextFunction } from 'express';

import bcrypt from 'bcrypt';

import { RegisterUseCase } from '../../application/useCases/RegisterUseCase';

import { UserMockRepository } from '../repositories/UserMockRepository';

import { HashPasswordService } from '../../application/services/HashPasswordService';

import { ClientError } from '../../domain/types/errors';

import { UserDataMapper } from '../../application/datamappers/UserDataMapper';

import { RoleMockRepository } from '../repositories/RoleMockRepository';

import { RoleDataMapper } from '../../application/datamappers/RoleDataMapper';

import { PermissionMockRepository } from '../repositories/PermissionMockRepository';

import { PermissionDataMapper } from '../../application/datamappers/PermissionDataMapper';
import { response } from '../utils';

const hashPasswordService = new HashPasswordService(bcrypt);

const userRepository = new UserMockRepository(
  new UserDataMapper(
    new RoleMockRepository(new RoleDataMapper(new PermissionMockRepository(new PermissionDataMapper()))),
  ),
);

const registerUseCase = new RegisterUseCase(userRepository, hashPasswordService);

export default async function registerController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email, password, roles } = req.body;

    const result = await registerUseCase.register({ name, email, password, roles });

    if (!result) throw new ClientError();

    return response(res, 200, result);
  } catch (error) {
    next(error);
  }
}
