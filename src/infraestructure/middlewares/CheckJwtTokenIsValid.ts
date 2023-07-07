import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';

export default function checkJwtTokenIsValid(req: Request, res: Response, next: NextFunction): void {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error('Token is missing');
        }
        const decodedToken: any = jwt.verify(token, config.SECRET_KEY);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && decodedToken.exp < currentTime) {
            throw new Error('Token has expired');
        }

        next();
    } catch (err) {
        res.status(401).json({});
    }
}


