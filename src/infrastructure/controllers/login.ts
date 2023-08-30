import { WrongAuthenticationTokenException } from '#src/domain/types/errors';
import { User as UserDataMapper } from '#src/application/mappers/User';
import { Role as RoleDataMapper } from '#src/application/mappers/Role';
import { Permission as PermissionDataMapper } from '#src/application/mappers/Permission';
import { JsonWebToken } from '#src/application/services/JsonWebToken';
import { Hash } from '#src/application/services/Hash';
import { Login } from '#src/application/useCases/Login';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { response } from '#src/infrastructure/utils';
import { UserMock } from '#src/infrastructure/repositories/UserMock';
import { PermissionMock } from '#src/infrastructure/repositories/PermissionMock';
import { RoleMock } from '#src/infrastructure/repositories/RoleMock';
import { Validator } from '#src/application/services/Validator';
import { Mock } from '#src/infrastructure/repositories/Mock';
import { User as UserEntity } from '#src/domain/entities/User';

const loginUseCase = new Login(
  new UserMock(
    new UserDataMapper(new RoleMock(new RoleDataMapper(new PermissionMock(new PermissionDataMapper())))),
    new Mock<UserEntity>(),
  ),
  new Hash(bcrypt),
  new JsonWebToken(jwt),
  new Validator(),
);

/**
 * Handles the login functionality by validating the email and password,
 * generating a token, and sending the token in the response.
 * @param {Request} req - The Request Expres .
 * @param {Response} res - The Response Expres .
 * @param {NextFunction} next - The NextFunction Expres.
 * @returns {Promise<void>} - A promise that resolves when the login process is complete.
 * @throws {WrongAuthenticationTokenException} - If the authentication token is invalid.
 */
const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    loginUseCase.validate(email, password);

    const token = await loginUseCase.login(email, password);

    if (!token) throw new WrongAuthenticationTokenException();

    return response(res, 200, { token });
  } catch (error) {
    next(error);
  }
};

export default login;
