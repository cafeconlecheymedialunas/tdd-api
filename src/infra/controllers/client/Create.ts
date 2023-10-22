import { NextFunction, Request, Response } from 'express';
import { ClientCrud } from '../../../core/useCases/ClientCrud';

import { Client as ClientPostgres } from '../../repositories/sequelize/Client';

export class Create {
    private readonly clientCrudUseCase: ClientCrud;
    constructor() {
        this.clientCrudUseCase = new ClientCrud(new ClientPostgres());
    }

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const clients = await this.clientCrudUseCase.create(req);

            res.json(clients);
        } catch (error) {
            next(error);
        }
    }
}
