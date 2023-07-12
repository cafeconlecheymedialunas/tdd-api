import { Router } from "express";
import loginController from "../controllers/login.controller";
import registerController from "../controllers/register.controller";
import { catchedAsync } from "../utils";
const router = Router();
router.post("/login", catchedAsync(loginController))
router.post("/register", catchedAsync(registerController))
export { router }