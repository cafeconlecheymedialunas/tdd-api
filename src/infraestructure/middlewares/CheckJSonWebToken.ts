import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

import { ClientError } from '../../domain/types/response';

import { JsonWebTokenService } from '../../application/services/JsonWebTokenService';

export const checkJsonWebToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ClientError();
    }

    const jsonWebTokenService = new JsonWebTokenService(jwt);

    const check = await jsonWebTokenService.check(token);

    if (!check) {
      throw new ClientError();
    }

    next();
  } catch (error) {
    next(error);
  }
};
