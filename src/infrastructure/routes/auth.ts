import { Router } from 'express';

import loginController from '../controllers/login';

import registerController from '../controllers/register';

import { catchedAsync } from '../utils';

const router = Router();

router.post('/login', catchedAsync(loginController));

router.post('/register', catchedAsync(registerController));

export { router };
