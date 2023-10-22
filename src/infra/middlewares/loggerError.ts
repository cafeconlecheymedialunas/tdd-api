import { NextFunction, Request, Response } from "express";

import winston from "winston"

const logger = winston.createLogger({
    level: 'warning',
    format: winston.format.json(),
    transports: [

        new winston.transports.File({ filename: 'error.log', level: 'warning' }),

        new winston.transports.Console({ format: winston.format.simple(), level: 'error' })
    ]
});


export function loggerError(err: Error, req: Request, res: Response, next: NextFunction) {
    logger.error(err.stack);

    next(err)
}
