import { ClientException } from '../../domain/types/errors';
import { NextFunction, Request, Response } from 'express';
import { resError } from '../utils';

/**
 * This function send a response in json format to handle ClientExceptions errors throw in appilcation.
 * @param {ClientException} err - Error .
 * @param {Request} _req - The request Express .
 * @param {Response} res - The response Express .
 * @param {NextFunction} next - The next express.
 * @returns {Promise<void>} - A promise that resolves when the authorization check is complete.
 * @throws {ClientException} - If the token, route, or method is missing.
 * @throws {NotAuthorizedException} - If the user is not authorized to access the route.
 */
const errorHandler = (err: ClientException, _req: Request, res: Response, next: NextFunction): void => {
  resError(res, err.status, err.message, err.errors);
  next();
};

export default errorHandler;
