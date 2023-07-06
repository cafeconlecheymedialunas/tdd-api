import { Router, Request, Response } from "express";
import loginController from "../controllers/login.controller";
import registerController from "../controllers/register.controller";


const router = Router();

router.post("/login", loginController)
router.post("/register", registerController)
export { router }