import {User as UserController} from '../controllers/User';
import { Router } from 'express';

const router = Router();

const userController = new UserController();

router.get('/users', userController.getAllUsers);

export { router };
