import { Router } from "express";
import { checkJsonWebToken } from "../middlewares/CheckJSonWebToken";
import { pruebaController } from "../controllers/prueba.controller";
import CheckUserPermissions from "../middlewares/CheckUserPermissions";
import { catchedAsync } from "../utils";

const router = Router();

router.get('/', catchedAsync(CheckUserPermissions), catchedAsync(checkJsonWebToken), pruebaController);
export { router }