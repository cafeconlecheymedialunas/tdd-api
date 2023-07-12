import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { CheckUserPermissionsUseCase } from '../../application/useCases/CheckUserPermissionsUseCase';
import { JsonWebTokenService } from '../../application/services/JsonWebTokenService';
import { CheckRoutePermissionsService } from '../../application/services/CheckRoutePermissionsService';
import { PermissionMockRepository } from '../repositories/PermissionMockRepository';
import { ClientError } from '../utils';
import { HttpStatuses } from '../../domain/types/response';

export default function CheckUserPermissions() {
    return async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization?.split(' ')[1]
        const route = req.baseUrl;
        const method = req.method;
        if (!token || !route || !method) {
            throw new ClientError('The request could not be made, try again later.', HttpStatuses.UNAUTHORIZED)
        }
        const checkUserPermisionsUseCase = new CheckUserPermissionsUseCase(new JsonWebTokenService(jsonwebtoken), new CheckRoutePermissionsService(new PermissionMockRepository()))
        const check = checkUserPermisionsUseCase.check(route, method, token)
        if (!check) {
            throw new ClientError('This action is unauthorized', HttpStatuses.UNAUTHORIZED)
        }
        next();

    }
}
