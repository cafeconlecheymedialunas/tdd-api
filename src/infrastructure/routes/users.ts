import users from '#root/infrastructure/controllers/users';
import { Router } from 'express';

const router = Router();

router.get('/users', users);

export { router };
