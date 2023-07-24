import { ClientException } from '../../domain/types/errors';
import { NextFunction, Request, Response } from 'express';
import { resError } from '../utils';

const errorHandler = (err: ClientException, req: Request, res: Response, next: NextFunction): void => {
  const status = err.status ?? 500;

  const message = err.message ?? 'Server Error';

  resError(res, status, message, err.errors);
  next();
};

export default errorHandler;
