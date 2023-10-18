import { NextFunction, Request, Response, Router } from 'express';
import { Delete as DeleteClient } from '../controllers/client/Delete';
import { Update as UpdateClient } from '../controllers/client/Update';
import { Create as CreateClient } from '../controllers/client/Create';
import { GetAll as GetAllClient } from '../controllers/client/GetAll';
import { getById as GetByIdClient } from '../controllers/client/GetById';
import { Login as LoginController } from '../controllers/user/Login';
import { Register as RegisterController } from '../controllers/user/Register';
import { Create as CreatePermission } from '../controllers/permission/Create';
import { Delete as DeletePermission } from '../controllers/permission/Delete';
import { GetAll as GetAllPermission } from '../controllers/permission/GetAll';
import { getById as GetByIdPermission } from '../controllers/permission/GetById';
import { Update as UpdatePermission } from '../controllers/permission/Upddate';
import { Delete as DeleteRole } from '../controllers/role/Delete';
import { Update as UpdateRole } from '../controllers/role/Update';
import { Create as CreateRole } from '../controllers/role/Create';
import { GetAll as GetAllRole } from '../controllers/role/GetAll';
import { getById as GetByIdRole } from '../controllers/role/GetById';
import { Delete as DeleteUser } from '../controllers/user/Delete';
import { GetAll as GetAllUser } from '../controllers/user/GetAll';
import { getById as GetByIdUser } from '../controllers/user/GetById';
import { Update as UpdateUser } from '../controllers/user/Update';

const router = Router();

//Client Routes


router.post('/client/', (req: Request, res: Response, next: NextFunction) => {
  const createClientController = new CreateClient();
  createClientController.handle(req, res, next);
});

router.get('/client', (req: Request, res: Response, next: NextFunction) => {
  const getAllClientController = new GetAllClient();
  getAllClientController.handle(req, res, next);
});

router.get('/client/:id', (req: Request, res: Response, next: NextFunction) => {
  const getByIdClientController = new GetByIdClient();
  getByIdClientController.handle(req, res, next);
});

router.put('/client/:id', (req: Request, res: Response, next: NextFunction) => {
  const updateClientController = new UpdateClient();
  updateClientController.handle(req, res, next);
});

router.delete('/client/:id', (req: Request, res: Response, next: NextFunction) => {
  const deleteClientController = new DeleteClient();
  deleteClientController.handle(req, res, next);
});


// Permission Routes

router.post('/permission', (req: Request, res: Response, next: NextFunction) => {
  const createPermissionController = new CreatePermission();
  createPermissionController.handle(req, res, next);
});

router.get('/permission', (req: Request, res: Response, next: NextFunction) => {

  const getAllPermissionController = new GetAllPermission();
  getAllPermissionController.handle(req, res, next);
});

router.get('/permission/:id', (req: Request, res: Response, next: NextFunction) => {
  const getByIdPermissionController = new GetByIdPermission();
  getByIdPermissionController.handle(req, res, next);
});

router.put('/permission/:id', (req: Request, res: Response, next: NextFunction) => {
  const updatePermissionController = new UpdatePermission();
  updatePermissionController.handle(req, res, next);
});

router.delete('/permission/:id', (req: Request, res: Response, next: NextFunction) => {
  const deletePermissionController = new DeletePermission();
  deletePermissionController.handle(req, res, next);
});

// Role Routes

router.post('/role', (req: Request, res: Response, next: NextFunction) => {
  const createRoleController = new CreateRole();
  createRoleController.handle(req, res, next);
});

router.get('/role', (req: Request, res: Response, next: NextFunction) => {
  const getAllRoleController = new GetAllRole();
  getAllRoleController.handle(req, res, next);
});

router.get('/role/:id', (req: Request, res: Response, next: NextFunction) => {
  const getByIdRoleController = new GetByIdRole();
  getByIdRoleController.handle(req, res, next);
});

router.put('/role/:id', (req: Request, res: Response, next: NextFunction) => {
  const updateRoleController = new UpdateRole();
  updateRoleController.handle(req, res, next);
});

router.delete('/role/:id', (req: Request, res: Response, next: NextFunction) => {
  const deleteRoleController = new DeleteRole();
  deleteRoleController.handle(req, res, next);
});

// User Route

router.post('/auth/login', (req: Request, res: Response, next: NextFunction) => {
  const loginController = new LoginController();
  loginController.handle(req, res, next);
});

router.post('/auth/register', (req: Request, res: Response, next: NextFunction) => {
  const registerController = new RegisterController();
  registerController.handle(req, res, next);
});

router.get('/user', (req: Request, res: Response, next: NextFunction) => {
  const getAllUserController = new GetAllUser();

  getAllUserController.handle(req, res, next);
});

router.get('/user/:id', (req: Request, res: Response, next: NextFunction) => {
  const getByIdUserController = new GetByIdUser();
  getByIdUserController.handle(req, res, next);
});

router.put('/user/:id', (req: Request, res: Response, next: NextFunction) => {
  const updateUserController = new UpdateUser();
  updateUserController.handle(req, res, next);
});

router.delete('/user/:id', (req: Request, res: Response, next: NextFunction) => {
  const deleteUserController = new DeleteUser();
  deleteUserController.handle(req, res, next);
});

export { router };
