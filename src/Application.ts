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
import ClientDatabase from 'infra/database/ClientDatabase';
import { Role } from 'infra/database/models/Role';
import { Permission } from 'infra/database/models/Permission';
import { User } from 'infra/database/models/User';
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

  async database() {
    

    const connectionDatabase = new ClientDatabase().getClient();

    
      Role.initialize(connectionDatabase);
      Permission.initialize(connectionDatabase);
      User.initialize(connectionDatabase);
  


  }
}

export default Application;
