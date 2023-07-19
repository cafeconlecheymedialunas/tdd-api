import { NextFunction, Request, Response } from 'express';
import { ClientError } from '../../domain/types/response';
import { resError } from '../utils';

const errorHandler = (err: ClientError, req: Request, res: Response, next: NextFunction): void => {
  const status = err.status ?? 500;

  const message = err.message ?? 'Server Error';

  console.log(err);
  res.status(status).json({
    msg: message,
    success: false,
  });
};

export default errorHandler;
