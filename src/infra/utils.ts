import { ValidationError } from '../core/types/validationRules';
import { Response } from 'express';

const resError = (res: Response, status = 500, message = 'Server Error', errors: ValidationError[] = []): void => {
  res.status(status).json({
    error: true,
    message,
    errors,
  });
};

const responseSuccess = (res: Response, status = 200, data: object): void => {
  res.status(status).json({
    error: false,
    data,
  });
};

export { resError, responseSuccess };
