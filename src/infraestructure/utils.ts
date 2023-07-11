import { Request, Response, NextFunction } from "express";

export const catchedAsync = (fn: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res).catch((err: Error) => next(err));
    };
};

export const resError = (res: Response, status: number, message: string) => {
    res.status(status).json({
        error: true,
        message,
    });
};

export const response = (res: Response, statusCode: number, data: object) => {
    res.status(statusCode).json({
        error: false,
        data,
    });
};

export class ClientError extends Error {
    statusCode
    constructor(message: string, status = 400) {
        super(message);
        this.statusCode = status;
    }
}