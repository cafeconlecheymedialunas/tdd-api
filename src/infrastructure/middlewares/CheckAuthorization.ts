import { ClientError, NotAuthorizedException } from '../../domain/types/errors';
import { PermissionDataMapper } from '../../application/datamappers/Permission';
import { JsonWebTokenService } from '../../application/services/JsonWebToken';
import { CheckRoutePermissionsService } from '../../application/services/CheckRoutePermissions';
import { AuthorizationUseCase } from '../../application/useCases/Authorization';
import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { PermissionMockRepository } from '../repositories/PermissionMockRepository';

export const checkAuthorization = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    const route = req.baseUrl;

    const method = req.method;

    if (!token || !route || !method) {
      throw new ClientError();
    }

    const checkUserPermisionsUseCase = new AuthorizationUseCase(
      new JsonWebTokenService(jsonwebtoken),
      new CheckRoutePermissionsService(new PermissionMockRepository(new PermissionDataMapper())),
    );

    const isAuthorized = await checkUserPermisionsUseCase.authorize(route, method, token);

    console.log(isAuthorized);
    if (!isAuthorized) {
      throw new NotAuthorizedException();
    }

    next();
  } catch (err) {
    next(err);
  }
};
