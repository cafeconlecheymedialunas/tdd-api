import { Router } from 'express';

import login from '#src/infrastructure/controllers/login';

import register from '#src/infrastructure/controllers/register';

const router = Router();

router.post('/login', login);

router.post('/register', register);

export { router };
