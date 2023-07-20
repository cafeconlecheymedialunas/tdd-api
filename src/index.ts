import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';
import router from './infrastructure/routes';
import errorHandler from './infrastructure/middlewares/errorHandler';

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
