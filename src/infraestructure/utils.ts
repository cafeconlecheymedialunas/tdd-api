import { Request, Response, NextFunction } from 'express';
import { ClientError } from '../domain/types/response';

export function catchedAsync(...functions: any[]): any {
  return function (req: Request, res: Response, next: NextFunction): void {
    functions.forEach((f) => {
      Promise.resolve(f(req, res, next)).catch(next);
    });
  };
}

export function resError(res: Response, status = 400, message: string): void {
  res.status(status).json({
    error: true,
    message,
  });
}

export function response(res: Response, status = 400, data: object): void {
  res.status(status).json({
    error: false,
    data,
  });
}

export function validateEmail(email: string): boolean {
  const re = /\S+@\S+\.\S+/;

  return re.test(email);
}
