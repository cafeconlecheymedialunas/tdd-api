import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ClientError } from '../utils';

import { JsonWebTokenService } from '../../application/services/JsonWebTokenService';
export default async function checkJwtTokenIsValid(req: Request, res: Response, next: NextFunction): Promise<void> {

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        throw new ClientError('The request could not be made, try again later.')
    }
    const jsonWebTokenService = new JsonWebTokenService(jwt)
    const check = await jsonWebTokenService.check(token);

    if (!check) {
        throw new ClientError('Token is not valid')
    }

    next();

}
