import { Router } from "express";
import authController from "../controllers/auth_controller.js";

const router = Router();

router.post('/', authController.login);

export default router;


