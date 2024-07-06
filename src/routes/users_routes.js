import { Router } from "express";
import users_controller from "../controllers/users_controller.js";
import { authenticateToken } from "../middlewares/authenticate_middleware.js";

const router = Router();

// router.get('/', users_controller.getUsers);

// router.post('/', users_controller.createUser);

router
    .route('/')
    .get(users_controller.getUsers)
    .post(users_controller.createUser);

router
    .route('/:id')
    .get(authenticateToken, users_controller.getUser)
    .put(authenticateToken, users_controller.updateUser)
    .delete(authenticateToken, users_controller.deleteUser)
    .patch(authenticateToken, users_controller.activeInactive);

router
    .route('/:id/tasks')
    .get(authenticateToken, users_controller.getTasks);

export default router;