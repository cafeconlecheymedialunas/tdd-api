import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { JsonWebTokenService } from '../../application/services/JsonWebTokenService';
import { Permission } from '../../domain/entities/Permission.entity';
export const checkRolesAndPermissions = (routePermissions:Permission[]) => {
    return async  (req: Request, res: Response, next: NextFunction) => {
        try {
      
      
            const jsonWebTokenService = new JsonWebTokenService(jsonwebtoken);
            const token = req.headers.authorization?.split(' ')[1]
            if (!token) {
                throw new Error("Token is invalid")
            }
            const decodedToken = await jsonWebTokenService.decode(token, routePermissions)
            if (!decodedToken) {
                throw new Error("Token is invalid")
            }
            
                      
            next();
        } catch (err) {
            res.status(401).json({});
        }
     
    }
  }

  
  