import { ClientException, NotAuthorizedException } from '../../domain/types/errors';
import { Permission as PermissionDataMapper } from '../../application/mappers/Permission';
import { JsonWebToken } from '../../application/services/JsonWebToken';
import { CheckRoutePermission } from '../../application/services/CheckRoutePermission';
import { Authorization } from '../../application/useCases/Authorization';
import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { PermissionMock } from '../repositories/PermissionMock';

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

    const authorizationUseCase = new Authorization(
      new JsonWebToken(jsonwebtoken),
      new CheckRoutePermission(new PermissionMock(new PermissionDataMapper())),
    );

    const isAuthorized = await authorizationUseCase.authorize(req);

    if (!isAuthorized) {
      throw new NotAuthorizedException();
    }

    next();
  } catch (err) {
    next(err);
  }
};
