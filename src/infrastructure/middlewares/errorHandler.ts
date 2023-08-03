import { ClientException } from '../../domain/types/errors';
import { Request, Response } from 'express';
import { resError } from '../utils';

/**
 * This function send a response in json format to handle ClientExceptions errors throw in appilcation.
 * @param {ClientException} err - Error .
 * @param {Request} _req - The request Express .
 * @param {Response} res - The response Express .
 * @returns {Promise<void>} - A promise that resolves when the authorization check is complete.
 */
const errorHandler = (err: ClientException, _req: Request, res: Response): void => {
  resError(res, err.status, err.message, err.errors);
};

export default errorHandler;
