import { NextFunction, Request, Response } from 'express';
import { ClientError } from '../../domain/types/response';
import { resError } from '../utils';

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof ClientError) {
    const { status, message } = err;

    resError(res, status, message, err);
    next(err);
  }
  next();
}
