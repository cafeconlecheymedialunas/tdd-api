import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { CheckUserPermissionsUseCase } from '../../application/useCases/CheckUserPermissionsUseCase';
import { JsonWebTokenService } from '../../application/services/JsonWebTokenService';
import { CheckRoutePermissionsService } from '../../application/services/CheckRoutePermissionsService';
import { PermissionMockRepository } from '../repositories/PermissionMockRepository';
import { ClientError } from '../utils';

export default function CheckUserPermissions() {
    return async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization?.split(' ')[1]
        console.log(token, 'Permissions')
        const route = req.baseUrl;
        const method = req.method;
        console.log(token, route, method, 'Permissions')
        if (!token || !route || !method) {
            throw new ClientError('The request could not be made, try again later.')
        }
        const checkUserPermisionsUseCase = new CheckUserPermissionsUseCase(new JsonWebTokenService(jsonwebtoken), new CheckRoutePermissionsService(new PermissionMockRepository()))
        const check = await checkUserPermisionsUseCase.check(route, method, token)
        if (!check) {
            throw new ClientError('This action is unauthorized')
        }
        next();

    }
}
