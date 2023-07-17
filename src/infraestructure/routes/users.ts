import { Router } from 'express';

import { checkJsonWebToken } from '../middlewares/CheckJSonWebToken';

import pruebaController from '../controllers/prueba.controller';

import { CheckAuthorization } from '../middlewares/CheckAuthorization';

import { catchedAsync } from '../utils';

const router = Router();

router.get('/', CheckAuthorization, catchedAsync(pruebaController));

export { router };
