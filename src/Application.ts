import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import hpp from 'hpp';
import config from './config';
import router from './infra/routes/index';
import errorHandler from './infra/middlewares/errorHandler';
import { checkAuthorization } from './infra/middlewares/CheckAuthorization';
import { limiter } from './infra/middlewares/rateLimiter';
import { Express } from 'express-serve-static-core';
import ClientDatabase from './infra/database/ClientDatabase';
import listEndpoints from 'express-list-endpoints';
class Application {
  private static _instance: Application;
  private app!: Express;
  private models: any;

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

    this.database();

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

    //this.app.use(errorHandler);
  }

  private secure() {
    this.app.use(limiter);

    this.app.use(helmet());

    this.app.use(hpp());

    //this.app.use(checkAuthorization);
  }

  private middlewares() {}

  async database() {
    const connectionDatabase = new ClientDatabase().getClient();

    const initModels = require('./infra/database/models/init-models.js');

    this.models = initModels(connectionDatabase);
  }

  public getModels() {
    return this.models;
  }
}

export default Application;
