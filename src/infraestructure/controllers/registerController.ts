import { ClientError } from '../../domain/types/errors';
import { UserDataMapper } from '../../application/datamappers/UserDataMapper';
import { RoleDataMapper } from '../../application/datamappers/RoleDataMapper';
import { PermissionDataMapper } from '../../application/datamappers/PermissionDataMapper';
import { HashPasswordService } from '../../application/services/HashPasswordService';
import { RegisterUseCase } from '../../application/useCases/RegisterUseCase';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { response } from '../utils';
import { UserMockRepository } from '../repositories/UserMockRepository';
import { RoleMockRepository } from '../repositories/RoleMockRepository';
import { PermissionMockRepository } from '../repositories/PermissionMockRepository';

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
