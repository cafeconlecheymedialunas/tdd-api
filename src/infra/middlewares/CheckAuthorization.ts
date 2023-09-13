import { NotAuthorizedException } from '../../core/types/errors';
import { JsonWebToken } from '../../core/services/JsonWebToken';
import { Authorization } from '../../core/useCases/Authorization';
import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { PermissionMock } from '../../infra/repositories/PermissionMock';

/**
 * Checks the authorization of a request validating the token, route, and method.
 * @param {Request} req - The Request Express .
 * @param {Response} _res - The  Response Express .
 * @param {NextFunction} next - The   NextFunction express.
 * @returns {Promise<void>} - A promise that resolves when the authorization check is complete.
 * @throws {ClientException} - If the token, route, or method is missing.
 * @throws {NotAuthorizedException} - If the user is not authorized to access the route.
 */
export const checkAuthorization = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.path.includes('/auth')) next();

    const token = req.headers.authorization?.split(' ')[1];

    const route = req.baseUrl;

    const method = req.method;

    if (!token) throw new NotAuthorizedException();

    const authorizationUseCase = new Authorization(new JsonWebToken(jsonwebtoken), new PermissionMock());

    const isAuthorized = await authorizationUseCase.authorize(route, method, token);

    if (isAuthorized === false) {
      throw new NotAuthorizedException();
    }

    next();
  } catch (err) {
    next(err);
  }
};
