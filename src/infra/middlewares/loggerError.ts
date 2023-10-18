import { NextFunction, Request, Response } from "express";

import winston from "winston"

// Configuración de los transportes para los registros
const logger = winston.createLogger({
    level: 'warning', // Nivel de registro (puedes cambiarlo según tus necesidades)
    format: winston.format.json(),
    transports: [
        // Almacena errores en un archivo
        new winston.transports.File({ filename: 'error.log', level: 'warning' }),
        // Muestra errores en la consola
        new winston.transports.Console({ format: winston.format.simple(), level: 'error' })
    ]
});

// Middleware de manejo de errores para Express
export function loggerError(err: Error, req: Request, res: Response, next: NextFunction) {
    logger.error(err.stack); // Registra el error en el archivo de registro

    // Enviar una respuesta al cliente (puedes personalizarlo según tus necesidades)
    next(err)
}
