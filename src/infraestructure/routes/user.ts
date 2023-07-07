import { Router, Request, Response } from "express";
import checkJwtTokenIsValid from "../middlewares/CheckJwtTokenIsValid";
import { pruebaController } from "../controllers/prueba.controller";
import CheckUserPermissions from "../middlewares/CheckUserPermissions";



const router = Router();


router.get("/", checkJwtTokenIsValid, CheckUserPermissions, pruebaController)
export { router }