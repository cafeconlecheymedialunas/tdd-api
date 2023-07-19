import { Request, Response, NextFunction } from 'express';

import jsonwebtoken from 'jsonwebtoken';

import { JsonWebTokenService } from '../../application/services/JsonWebTokenService';

import { CheckRoutePermissionsService } from '../../application/services/CheckRoutePermissionsService';

import { PermissionMockRepository } from '../repositories/PermissionMockRepository';

import { PermissionDataMapper } from '../../application/datamappers/PermissionDataMapper';

import { AuthorizationUseCase } from '../../application/useCases/AuthorizationUseCase';
import { ClientError, NotAuthorizedException } from '../../domain/types/errors';

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
