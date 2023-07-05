import { Router, Request, Response } from "express";
import checkJwtTokenIsValid from "../middlewares/CheckJwtTokenIsValid";
import checkRolesAndPermissions from "../middlewares/CheckRolesAndPermissions";
import { pruebaController } from "../controllers/authentification.controller";



const router = Router();


router.get("/", checkJwtTokenIsValid,checkRolesAndPermissions,pruebaController)
export { router }