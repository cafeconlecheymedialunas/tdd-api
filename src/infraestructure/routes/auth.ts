import { Router } from 'express';

import loginController from '../controllers/loginController';

import registerController from '../controllers/registerController';

import { catchedAsync } from '../utils';

const router = Router();

router.post('/login', catchedAsync(loginController));

router.post('/register', catchedAsync(registerController));

export { router };
