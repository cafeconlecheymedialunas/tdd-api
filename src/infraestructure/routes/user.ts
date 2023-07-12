import { Router } from "express";
import checkJwtTokenIsValid from "../middlewares/CheckJwtTokenIsValid";
import { pruebaController } from "../controllers/prueba.controller";
import CheckUserPermissions from "../middlewares/CheckUserPermissions";
import { catchedAsync } from "../utils";

const router = Router();

router.get("/", catchedAsync(checkJwtTokenIsValid), catchedAsync(CheckUserPermissions), pruebaController)
export { router }