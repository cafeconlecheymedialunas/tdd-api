import { ClientError } from '../../domain/types/errors';
import { UserDataMapper } from '../../application/datamappers/User';
import { RoleDataMapper } from '../../application/datamappers/Role';
import { PermissionDataMapper } from '../../application/datamappers/Permission';
import { HashPasswordService } from '../../application/services/HashPassword';
import { RegisterUseCase } from '../../application/useCases/Register';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { response } from '../utils';
import { UserMockRepository } from '../repositories/UserMockRepository';
import { RoleMockRepository } from '../repositories/RoleMockRepository';
import { PermissionMockRepository } from '../repositories/PermissionMockRepository';
import { ValidatorService } from '../../application/services/Validator';

const registerUseCase = new RegisterUseCase(
  new UserMockRepository(
    new UserDataMapper(
      new RoleMockRepository(new RoleDataMapper(new PermissionMockRepository(new PermissionDataMapper()))),
    ),
  ),
  new HashPasswordService(bcrypt),
  new ValidatorService(),
);

const registerController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, roles } = req.body;

    const result = await registerUseCase.register({ name, email, password, roles });

    if (!result) throw new ClientError();

    return response(res, 200, result);
  } catch (error) {
    next(error);
  }
};

export default registerController;
