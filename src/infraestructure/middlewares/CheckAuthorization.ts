import { Request, Response, NextFunction } from 'express';

import jsonwebtoken from 'jsonwebtoken';

import { AuthorizationUseCase } from '../../application/useCases/AuthorizationUseCase';

import { JsonWebTokenService } from '../../application/services/JsonWebTokenService';

import { CheckRoutePermissionsService } from '../../application/services/CheckRoutePermissionsService';

import { PermissionMockRepository } from '../repositories/PermissionMockRepository';

import { ClientError } from '../../domain/types/response';

import { PermissionDtoMapper } from '../../application/datamappers/PermissionDtoMapper';

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

    const check = await checkUserPermisionsUseCase.check(route, method, token);

    if (!check) {
      throw new ClientError();
    }

    next();
  } catch (error) {
    next(error);
  }
};
