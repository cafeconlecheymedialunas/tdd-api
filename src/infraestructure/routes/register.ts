import { Router, Request, Response } from "express";
import registerController from "../controllers/register.controller";


const router = Router();

router.post("/", registerController)

export { router }