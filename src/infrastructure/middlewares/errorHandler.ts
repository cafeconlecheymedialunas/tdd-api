import { ClientException } from '../../domain/types/errors';
import { NextFunction, Request, Response } from 'express';
import { resError } from '../../infrastructure/utils';

/**
 * This function sends a JSON formatted response to handle errors thrown by ClientExceptions in the application.
 * @param {ClientException} err - The error thrown.
 * @param {Request} _req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @returns {Promise<void>} - A promise that resolves when the error response is sent.
 */
const errorHandler = (err: ClientException, _req: Request, res: Response, next: NextFunction): void => {
  resError(res, err.status, err.message, err.errors);
  next();
};

export default errorHandler;
