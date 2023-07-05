import { Router, Request, Response } from "express";
import { loginController } from "../controllers/authentification.controller";


const router = Router();

router.post("/", loginController)

export { router }