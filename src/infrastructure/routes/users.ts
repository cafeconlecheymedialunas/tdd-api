import { Router } from 'express';
import users from '../controllers/users';
import { checkAuthorization } from '../middlewares/CheckAuthorization';

const router = Router();

router.get('/', checkAuthorization, users);

export { router };
