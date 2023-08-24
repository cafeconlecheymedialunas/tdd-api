import { Router } from 'express';

import login from '#root/infrastructure/controllers/login';

import register from '#root/infrastructure/controllers/register';

const router = Router();

router.post('/login', login);

router.post('/register', register);

export { router };
