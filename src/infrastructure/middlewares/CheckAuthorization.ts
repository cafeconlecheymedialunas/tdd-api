import { ClientException, NotAuthorizedException } from '../../domain/types/errors';
import { Permission as PermissionDataMapper } from '../../application/mappers/Permission';
import { JsonWebToken } from '../../application/services/JsonWebToken';
import { CheckRoutePermission } from '../../application/services/CheckRoutePermission';
import { Authorization } from '../../application/useCases/Authorization';
import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { PermissionMock } from '../repositories/PermissionMock';

export const checkAuthorization = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    const route = req.baseUrl;

    const method = req.method;

    if (!token || !route || !method) {
      throw new ClientException();
    }

    const checkUserPermisionsUseCase = new Authorization(
      new JsonWebToken(jsonwebtoken),
      new CheckRoutePermission(new PermissionMock(new PermissionDataMapper())),
    );

    const isAuthorized = await checkUserPermisionsUseCase.authorize(route, method, token);

    if (!isAuthorized) {
      throw new NotAuthorizedException();
    }

    next();
  } catch (err) {
    next(err);
  }
};
