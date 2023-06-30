import { Express, Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken'

function checkJwtTokenIsValid(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers['authorization'];
}
