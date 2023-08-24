import { WrongAuthenticationTokenException } from 'domain/types/errors';
import { User as UserDataMapper } from 'application/mappers/User';
import { Role as RoleDataMapper } from 'application/mappers/Role';
import { Permission as PermissionDataMapper } from 'application/mappers/Permission';
import { JsonWebToken } from 'application/services/JsonWebToken';
import { Hash } from 'application/services/Hash';
import { Login } from 'application/useCases/Login';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { response } from 'infrastructure/utils';
import { UserMock } from 'infrastructure/repositories/UserMock';
import { PermissionMock } from 'infrastructure/repositories/PermissionMock';
import { RoleMock } from 'infrastructure/repositories/RoleMock';
import { Validator } from 'application/services/Validator';
import { Mock } from 'infrastructure/repositories/Mock';
import { User as UserEntity } from 'domain/entities/User';

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
