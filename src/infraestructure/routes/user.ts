import { Router, Request, Response } from "express";
import checkJwtTokenIsValid from "../middlewares/CheckJwtTokenIsValid";
import checkRolesAndPermissions from "../middlewares/CheckRolesAndPermissions";
import { pruebaController } from "../controllers/prueba.controller";
import { UserController } from "../controllers/user.controller";
import { getUser } from "../../domain/types/roles.types";


const router = Router();


router.get("/", checkJwtTokenIsValid, checkRolesAndPermissions([getUser]),pruebaController)
export { router }