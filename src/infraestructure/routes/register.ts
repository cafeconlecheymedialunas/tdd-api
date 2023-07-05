import { Router, Request, Response } from "express";
import {  registerController } from "../controllers/authentification.controller";


const router = Router();

router.post("/", registerController)

export { router }