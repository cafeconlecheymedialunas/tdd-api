import cors from 'cors';

import express from 'express';

import 'express-async-errors';

import router from './infraestructure/routes';

import bodyParser from 'body-parser';

import config from './config';

import { Request, Response, NextFunction } from 'express';

import { ClientError } from './domain/types/response';
import { resError } from './infraestructure/utils';
import errorHandler from './infraestructure/middlewares/errorHandler';

const app = express();

app.set('port', config.PORT);

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.use(errorHandler);

app.listen(app.get('port'), () => {
  console.log(`Server Started on port:${app.get('port')}`);
});

export { app };
