import { WrongAuthenticationTokenException } from '../../core/types/errors';
import { JsonWebToken } from '../../core/services/JsonWebToken';
import { Hash } from '../../core/services/Hash';
import { Login } from '../../core/useCases/Login';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { response } from '../utils';
import { UserMock } from '../repositories/UserMock';
import { PermissionMock } from '../repositories/PermissionMock';
import { RoleMock } from '../repositories/RoleMock';
import { Validator } from '../../core/services/Validator';
import { Mock } from '../repositories/Mock';
import { User as UserEntity } from '../../core/entities/User';

const loginUseCase = new Login(
  new UserMock(new Mock<UserEntity>(), new RoleMock(new PermissionMock())),
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
