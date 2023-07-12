import { Request, Response, NextFunction } from "express";

export const catchedAsync = (fn: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).then().catch((err: ClientError) => next(err));
    };
};

export const resError = (res: Response, status = 400, message: string) => {

    res.status(status).json({
        error: true,
        message,
    });
};

export const response = (res: Response, status = 400, data: object) => {
    res.status(status).json({
        error: false,
        data,
    });
};

export class ClientError extends Error {
    status
    constructor(message: string, status = 400) {
        super(message);
        this.status = status;
    }
}