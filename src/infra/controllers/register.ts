import { WrongCredentialsException } from '../../core/types/errors';
import { Hash } from '../../core/services/Hash';
import { Register } from '../../core/useCases/Register';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { response } from '../../infra/utils';
import { UserMock } from '../../infra/repositories/UserMock';
import { RoleMock } from '../../infra/repositories/RoleMock';
import { PermissionMock } from '../../infra/repositories/PermissionMock';
import { Validator } from '../../core/services/Validator';
import { Mock } from '../../infra/repositories/Mock';
import { User as UserEntity } from '../../core/entities/User';

const registerUseCase = new Register(
  new UserMock(new Mock<UserEntity>(), new RoleMock(new PermissionMock())),
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
