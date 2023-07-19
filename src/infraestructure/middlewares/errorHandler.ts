import { NextFunction, Request, Response } from 'express';
import { ClientError } from '../../domain/types/errors';
import { resError } from '../utils';

const errorHandler = (err: ClientError, req: Request, res: Response, next: NextFunction): void => {
  const status = err.status ?? 500;

  const message = err.message ?? 'Server Error';

  console.log(err);
  resError(res, status, message);
};

export default errorHandler;
