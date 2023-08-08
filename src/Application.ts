import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import bodyParser from 'body-parser';
import router from './infrastructure/routes/index';
import errorHandler from './infrastructure/middlewares/errorHandler';
import { checkAuthorization } from './infrastructure/middlewares/checkAuthorization';
import rateLimiter from './infrastructure/middlewares/rateLimiter';
import { ClientException } from './domain/types/errors';
import http from 'node:http';
import portfinder from 'portfinder';
import config from './config';

class Application {
    private app;
    private static _instance: Application;
    constructor() {
        this.app = express();
    }

    static getInstance(): Application {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new Application();
        return this._instance;
    }

    config = (): void => {
        this.app.use(cors());

        this.app.use(helmet());

        this.app.use(hpp());

        this.app.use(rateLimiter);

        this.app.use(express.json());

        this.app.use(bodyParser.urlencoded({ extended: false }));
    };

    routes = (): void => {
        this.app.use(checkAuthorization);

        this.app.use(router);
    };

    errors = (): void => {
        this.app.use(errorHandler);
    };

    server = (): void => {
        portfinder.basePort = config.PORT;
        portfinder.highestPort = config.PORT + 100;
        portfinder.getPort((err: Error, port: number) => {
            if (err) throw new ClientException;
            http.createServer().listen(port, () => console.log(`app listening on: http://localhost:${port}`));
        });
    };
}

export default Application;
