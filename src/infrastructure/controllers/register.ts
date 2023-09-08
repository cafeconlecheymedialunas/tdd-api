import { WrongCredentialsException } from '../../domain/types/errors';
import { User as UserDataMapper } from '../../application/mappers/User';
import { Role as RoleDataMapper } from '../../application/mappers/Role';
import { Permission as PermissionDataMapper } from '../../application/mappers/Permission';
import { Hash } from '../../application/services/Hash';
import { Register } from '../../application/useCases/Register';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { response } from '../../infrastructure/utils';
import { UserMock } from '../../infrastructure/repositories/UserMock';
import { RoleMock } from '../../infrastructure/repositories/RoleMock';
import { PermissionMock } from '../../infrastructure/repositories/PermissionMock';
import { Validator } from '../../application/services/Validator';
import { Mock } from '../../infrastructure/repositories/Mock';
import { User as UserEntity } from '../../domain/entities/User';

const registerUseCase = new Register(
  new UserMock(
    new UserDataMapper(new RoleMock(new RoleDataMapper(new PermissionMock(new PermissionDataMapper())))),
    new Mock<UserEntity>(),
  ),
  new Hash(bcrypt),
  new Validator(),
);

/**
 * Registers a new user with the provided name, email, password, and roles.
 * @param {Request} req - The Request Express containing the user's information.
 * @param {Response} res - The Response Express to send the result to.
 * @param {NextFunction} next - The next function to call in the middleware chain.
 * @returns {Promise<void>} - A promise that resolves when the registration is complete.
 * @throws {WrongCredentialsException} - If the registration fails.
 */
const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, roles } = req.body;

    const result = await registerUseCase.register({ name, email, password, roles });

    if (!result) throw new WrongCredentialsException();

    return response(res, 200, result);
  } catch (error) {
    next(error);
  }
};

export default register;
