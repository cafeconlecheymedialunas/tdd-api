import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { ClientError } from '../utils';
import { HttpStatuses } from '../../domain/types/response';
export default function checkJwtTokenIsValid(req: Request, res: Response, next: NextFunction): void {

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        throw new ClientError('The request could not be made, try again later.', HttpStatuses.UNAUTHORIZED)
    }
    const decodedToken: any = jwt.verify(token, config.SECRET_KEY);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < currentTime) {
        throw new ClientError('Token has expired.', HttpStatuses.FORBIDDEN)
    }
    next();

}
