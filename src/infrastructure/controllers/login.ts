import { WrongAuthenticationTokenException } from '../../domain/types/errors';
import { UserDataMapper } from '../../application/mappers/User';
import { Role as RoleDataMapper } from '../../application/mappers/Role';
import { Permission as PermissionDataMapper } from '../../application/mappers/Permission';
import { JsonWebToken } from '../../application/services/JsonWebToken';
import { Hash } from '../../application/services/Hash';
import { Login } from '../../application/useCases/Login';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { response } from '../utils';
import { UserMock } from '../repositories/UserMock';
import { PermissionMock } from '../repositories/PermissionMock';
import { RoleMock } from '../repositories/RoleMock';
import { Validator } from '../../application/services/Validator';

/**
 * Creates a new instance of the Login use case.
 * @param {UserMock} userMock - The user mock object.
 * @param {Hash} Hash - The Hash Service.
 * @param {JsonWebToken} jsonWebToken - The JsonWebToken Service.
 * @param {Validator} validator - The Validator Service.
 */
const loginUseCase = new Login(
  new UserMock(new UserDataMapper(new RoleMock(new RoleDataMapper(new PermissionMock(new PermissionDataMapper()))))),
  new Hash(bcrypt),
  new JsonWebToken(jwt),
  new Validator(),
);

/**
 * Handles the login functionality by validating the email and password,
 * generating a token, and sending the token in the response.
 * @param {Request} req - The request Express .
 * @param {Response} res - The response Express .
 * @param {NextFunction} next - The next express.
 * @returns {Promise<void>} - A promise that resolves when the login process is complete.
 * @throws {WrongAuthenticationTokenException} - If the authentication token is invalid.
 */
const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    loginUseCase.validate(email, password);

    const token = await loginUseCase.login(email, password);

    if (!token) throw new WrongAuthenticationTokenException();

    response(res, 200, { token });
  } catch (error) {
    next(error);
  }
};

export default login;
