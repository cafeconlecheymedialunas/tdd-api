import { Request, Response, NextFunction } from 'express';

import jsonwebtoken from 'jsonwebtoken';

import { JsonWebTokenService } from '../../application/services/JsonWebTokenService';

import { CheckRoutePermissionsService } from '../../application/services/CheckRoutePermissionsService';

import { PermissionMockRepository } from '../repositories/PermissionMockRepository';

import { ClientError, NotAuthorizedException } from '../../domain/types/response';

import { PermissionDtoMapper } from '../../application/datamappers/PermissionDtoMapper';

import { AuthorizationUseCase } from '../../application/useCases/AuthorizationUseCase';

export const CheckAuthorization = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    const route = req.baseUrl;

    const method = req.method;

    if (!token || !route || !method) {
      throw new ClientError();
    }

    const checkUserPermisionsUseCase = new AuthorizationUseCase(
      new JsonWebTokenService(jsonwebtoken),
      new CheckRoutePermissionsService(new PermissionMockRepository(new PermissionDtoMapper())),
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
