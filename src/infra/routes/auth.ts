import { NextFunction, Request, Response, Router } from 'express';
import { Login as LoginController } from '../controllers/user/Login';
import {Register as RegisterController } from '../controllers/user/Register';

const router = Router();

router.post('/login', (req: Request, res: Response, next: NextFunction)=>{
    const loginController = new LoginController()
    loginController.handle(req,next)
});

router.post('/register', (req: Request, res: Response, next: NextFunction)=>{
    const registerController = new RegisterController()
    registerController.handle(req,next)
});

export { router };
