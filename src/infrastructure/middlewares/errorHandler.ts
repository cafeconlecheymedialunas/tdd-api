import { ClientException } from '../../domain/types/errors';
import { Request, Response } from 'express';
import { resError } from '../utils';

/**
 * This function sends a JSON formatted response to handle errors thrown by ClientExceptions in the application.
 * @param {ClientException} err - The error thrown.
 * @param {Request} _req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @returns {Promise<void>} - A promise that resolves when the error response is sent.
 */
const errorHandler = (err: ClientException, _req: Request, res: Response): void => {
  resError(res, err.status, err.message, err.errors);
};

export default errorHandler;
