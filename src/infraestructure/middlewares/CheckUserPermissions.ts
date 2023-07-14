import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { CheckUserPermissionsUseCase } from '../../application/useCases/CheckUserPermissionsUseCase';
import { JsonWebTokenService } from '../../application/services/JsonWebTokenService';
import { CheckRoutePermissionsService } from '../../application/services/CheckRoutePermissionsService';
import { PermissionMockRepository } from '../repositories/PermissionMockRepository';
import { ClientError } from '../utils';
import { PermissionDtoMapper } from '../../application/datamappers/PermissionDtoMapper';

export default async function CheckUserPermissions(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    const route = req.baseUrl;
    const method = req.method;

    if (!token || !route || !method) {
      throw new ClientError('The request could not be made, try again later.');
    }
    const checkUserPermisionsUseCase = new CheckUserPermissionsUseCase(
      new JsonWebTokenService(jsonwebtoken),
      new CheckRoutePermissionsService(new PermissionMockRepository(new PermissionDtoMapper())),
    );
    const check = await checkUserPermisionsUseCase.check(route, method, token);
    if (!check) {
      throw new ClientError('This action is unauthorized');
    }
    next();
  } catch (error) {
    next(error);
  }
}
