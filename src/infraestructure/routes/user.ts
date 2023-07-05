import { Router, Request, Response } from "express";
import checkJwtTokenIsValid from "../middlewares/CheckJwtTokenIsValid";
import { checkRolesAndPermissions } from "../middlewares/CheckRolesAndPermissions";
import { pruebaController } from "../controllers/authentification.controller";
import { getUser } from "../../domain/types/roles.types";


const router = Router();


router.get("/", checkJwtTokenIsValid, checkRolesAndPermissions([getUser]),pruebaController)
export { router }