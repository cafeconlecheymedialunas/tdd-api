import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import hpp from 'hpp';
import config from './config';
import router from './infrastructure/routes/index';
import errorHandler from './infrastructure/middlewares/errorHandler';
import { checkAuthorization } from './infrastructure/middlewares/CheckAuthorization';

const app = express();

app.set('port', config.PORT);

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet());

app.use(hpp());

app.use(router);

app.use(checkAuthorization);

app.use(errorHandler);

export default app;
