import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { RegisterUserUseCase } from '../../application/useCases/RegisterUserUseCase';
import { UserMockRepository } from '../repositories/UserMockRepository';
import { HashPasswordService } from '../../application/services/HashPasswordService';
import { ClientError, response } from '../utils';
import { UserDtoMapper } from '../../application/datamappers/UserDtoMapper';
import { RoleMockRepository } from '../repositories/RoleMockRepository';
import { RoleDtoMapper } from '../../application/datamappers/RoleDtoMapper';
import { PermissionMockRepository } from '../repositories/PermissionMockRepository';
import { PermissionDtoMapper } from '../../application/datamappers/PermissionDtoMapper';
const hashPasswordService = new HashPasswordService(bcrypt);
const userRepository = new UserMockRepository(
  new UserDtoMapper(new RoleMockRepository(new RoleDtoMapper(new PermissionMockRepository(new PermissionDtoMapper())))),
);
const registerUseCase = new RegisterUserUseCase(userRepository, hashPasswordService);
export default async function registerController(req: Request, res: Response): Promise<void> {
  const { name, email, password, roles } = req.body;
  const result = await registerUseCase.register({ name, email, password, roles });
  if (!result) throw new ClientError('Not registered', 400);
  return response(res, 200, result);
}
