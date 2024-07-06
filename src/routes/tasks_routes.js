import { Router } from "express";
import tasks_controller from "../controllers/tasks_controller.js";

const router = Router();

router
    .route('/')    
    .get(tasks_controller.getTasks)
    .post(tasks_controller.createTask);

router
    .route('/:id')
    .get(tasks_controller.getTask)
    .put(tasks_controller.updateTask)
    .delete(tasks_controller.deleteTask)
    .patch(tasks_controller.taskDone);

export default router;