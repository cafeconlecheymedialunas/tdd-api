import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { CheckUserPermissionsUseCase } from '../../application/useCases/CheckUserPermissionsUseCase';
import { JsonWebTokenService } from '../../application/services/JsonWebTokenService';
import { CheckRoutePermissionsService } from '../../application/services/CheckRoutePermissionsService';
import { PermissionMockRepository } from '../repositories/PermissionMockRepository';
export default function CheckUserPermissions() {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(' ')[1]
            const route = req.baseUrl;
            const method = req.method;
            if (!token || !route || !method) {
                throw new Error("Not valid")
            }
            const checkUserPermisionsUseCase = new CheckUserPermissionsUseCase(new JsonWebTokenService(jsonwebtoken), new CheckRoutePermissionsService(new PermissionMockRepository()))
            const check = checkUserPermisionsUseCase.check(route, method, token)
            console.log(check)
            if (!check) {
                throw new Error('User Permissions required not valid')
            }
            next();
        } catch (err) {
            res.status(401).json({});
        }
    }
}
