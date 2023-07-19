import { ValidationError } from '../domain/types/response';
import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function catchedAsync(...functions: any[]): any {
  return function (req: Request, res: Response, next: NextFunction): void {
    functions.forEach((f) => {
      Promise.resolve(f(req, res, next)).catch(next);
    });
  };
}

export function resError(res: Response, status = 400, message = 'Server Error', errors: ValidationError[] = []): void {
  res.status(status).json({
    error: true,
    message,
    errors,
  });
}

export function response(res: Response, status = 200, data: object): void {
  res.status(status).json({
    error: false,
    data,
  });
}

export function validateEmail(email: string): boolean {
  const re = /\S+@\S+\.\S+/;

  return re.test(email);
}
