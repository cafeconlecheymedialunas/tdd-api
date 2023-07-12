import { Request, Response, NextFunction } from "express";

export const catchedController = (fn: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res).catch((err: ClientError) => next(err));
    };
};
export const catchedAsync = (...functions: any[]) => (req: Request, res: Response, next: NextFunction) => {
    functions.forEach(f => {
        Promise
            .resolve(f(req, res, next))
            .catch(next)
    });

}


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


export const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export class ClientError extends Error {
    status
    constructor(message: string, status = 400) {
        super(message);
        this.status = status;
    }
}