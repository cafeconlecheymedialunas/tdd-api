import { Router } from 'express';

import login from '../../infra/controllers/login';

import register from '../../infra/controllers/register';

const router = Router();

router.post('/login', login);

router.post('/register', register);

export { router };
