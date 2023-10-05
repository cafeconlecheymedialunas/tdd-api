import { NextFunction, Request, Response, Router } from 'express';
import { Delete } from '../controllers/role/Delete';
import { Update } from '../controllers/role/Update';
import { Create } from '../controllers/role/Create';
import { GetAll } from '../controllers/role/GetAll';
import { getById } from '../controllers/role/GetById';

const router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const createRoleController = new Create();
  createRoleController.handle(req, next);
});

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  const getAllRoleController = new GetAll();
  getAllRoleController.handle(req, next);
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const getByIdRoleController = new getById();
  getByIdRoleController.handle(req, next);
});

router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  const updateRoleController = new Update();
  updateRoleController.handle(req, next);
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  const deleteRoleController = new Delete();
  deleteRoleController.handle(req, next);
});

export { router };
