import { Router } from "express";
import { createNewTask, getTasks } from "../controllers/task.controller";
import { createTaskSchema } from "../schemas/task.schema";
import { validateRequest } from "../middlewares/validation.middleware";
import { isAuth } from "../middlewares/auth.middlewares";

const router = Router();

router.get("/", isAuth, getTasks);
router.post("/", createTaskSchema, isAuth, validateRequest, createNewTask);

export default router;
