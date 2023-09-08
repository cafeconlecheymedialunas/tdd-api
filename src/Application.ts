import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import hpp from 'hpp';
import config from './config';
import router from './infrastructure/routes/index';
import errorHandler from './infrastructure/middlewares/errorHandler';
import { checkAuthorization } from './infrastructure/middlewares/CheckAuthorization';
import { limiter } from './infrastructure/middlewares/rateLimiter';
import { Express } from 'express-serve-static-core';

class Application {
  private static _instance: Application;
  private app!: Express;

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new Application();
    return this._instance;
  }

  run() {
    if (this.app) {
      return this.app;
    }

    this.app = express();

    this.config();

    this.secure();

    this.middlewares();

    return this.app;
  }

  private config() {
    this.app.set('port', config.PORT);

    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(router);
  }

  private secure() {
    this.app.use(limiter);

    this.app.use(helmet());

    this.app.use(hpp());
  }

  private middlewares() {
    this.app.use(checkAuthorization);

    this.app.use(errorHandler);
  }
}

export default Application;
