import { NextFunction, Request, Response } from 'express';
import { ClientError } from '../../domain/types/response';
import { resError } from '../utils';

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) {
    return next(err);
  }
  if (req.xhr && err instanceof ClientError) {
    const { status, message } = err;

    if (req.xhr) {
      resError(res, status, message);
    }
  } else {
    // Manejo de errores generales
    console.error(err); // Opcional: Imprime el error en la consola del servidor

    const status = 500; // Código de estado HTTP para errores internos del servidor

    const message = 'Ha ocurrido un error en el servidor.';

    if (req.xhr) {
      resError(res, status, message);
    }
  }
}
