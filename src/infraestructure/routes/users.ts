import { Router } from 'express';

import pruebaController from '../controllers/pruebaController';

import { checkAuthorization } from '../middlewares/CheckAuthorization';

import { catchedAsync } from '../utils';

const router = Router();

router.get('/', checkAuthorization, catchedAsync(pruebaController));

export { router };
