
import { NextFunction, Request, Response, Router } from 'express';
import { Create } from '../controllers/permission/Create';
import { Delete } from '../controllers/permission/Delete';
import { GetAll } from '../controllers/permission/GetAll';
import { getById } from '../controllers/permission/GetById';
import { Update } from '../controllers/permission/Upddate';

const router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction)=>{
    const { route, method } = req.body;
    const createPermissionController = new Create()
    createPermissionController.handle(req,next)
});

router.get('/', (req: Request, res: Response, next: NextFunction)=>{
    
    const getAllermissionController = new GetAll()
    getAllermissionController.handle(req,next)
});

router.get('/:id', (req: Request, res: Response, next: NextFunction)=>{
    const { id } = req.body;
    const getByIdPermissionController = new getById()
    getByIdPermissionController.handle(id,next)
});

router.put('/:id', (req: Request, res: Response, next: NextFunction)=>{
    const updatePermissionController = new Update()
    updatePermissionController.handle(req,next)
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction)=>{
    const deletePermissionController = new Delete()
    deletePermissionController.handle(req,next)
});

export { router };
