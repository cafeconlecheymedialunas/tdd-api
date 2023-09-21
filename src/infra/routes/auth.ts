import { Router } from 'express';
import { registerUser } from 'infra/controllers';
import { loginUser } from 'infra/controllers';

const router = Router();

router.post('/login', loginUser.handle);

router.post('/register', registerUser.handle);

export { router };
