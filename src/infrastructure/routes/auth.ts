import { Router } from 'express';

import login from '../controllers/login';

import register from '../controllers/register';

import { catchedAsync } from '../utils';

const router = Router();

router.post('/login', catchedAsync(login));

router.post('/register', catchedAsync(register));

export { router };
