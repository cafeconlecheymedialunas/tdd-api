import { userController } from 'infra/controllers';
import { Router } from 'express';

const router = Router();

router.get('/users', userController.getAll);

export { router };
