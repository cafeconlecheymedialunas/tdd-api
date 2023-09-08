import { Router } from 'express';

import login from '../../infrastructure/controllers/login';

import register from '../../infrastructure/controllers/register';

const router = Router();

router.post('/login', login);

router.post('/register', register);

export { router };
