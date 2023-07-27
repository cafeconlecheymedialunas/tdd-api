import { Router } from 'express';
import usersController from '../controllers/users';
import { checkAuthorization } from '../middlewares/CheckAuthorization';

const router = Router();

router.get('/', checkAuthorization, usersController);

export { router };
