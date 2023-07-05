import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { JsonWebTokenService } from '../../application/services/JsonWebTokenService';

export default async function checkRolesAndPermissions(req: Request, res: Response, next: NextFunction): Promise<void> {

    
    
    try {
      
      
        const jsonWebTokenService = new JsonWebTokenService(jsonwebtoken);
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            throw new Error("Token is invalid")
        }
        const decodedToken = await jsonWebTokenService.decode(token)
        if (!decodedToken) {
            throw new Error("Token is invalid")
        }
        
                  
        next();
    } catch (err) {
        res.status(401).json({});
    }
}

  
  