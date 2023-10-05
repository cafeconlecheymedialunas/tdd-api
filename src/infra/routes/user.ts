import { NextFunction, Request, Response, Router } from 'express';
import { Delete } from '../controllers/user/Delete';
import { GetAll } from '../controllers/user/GetAll';
import { getById } from '../controllers/user/GetById';
import { Update } from '../controllers/user/Update';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  const getAllUserController = new GetAll();

  getAllUserController.handle(req, next);
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const getByIdUserController = new getById();
  getByIdUserController.handle(req, next);
});

router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  const updateUserController = new Update();
  updateUserController.handle(req, next);
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  const deleteUserController = new Delete();
  deleteUserController.handle(req, next);
});

export { router };
