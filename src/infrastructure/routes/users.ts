import { Router } from 'express';
import pruebaController from '../controllers/prueba';
import { checkAuthorization } from '../middlewares/CheckAuthorization';

const router = Router();

router.get('/', checkAuthorization, pruebaController);

export { router };
