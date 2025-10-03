import { Router } from "express";
import { createNewUser, getUser } from "../controllers/user.controller";
import { createUserSchema } from "../schemas/user.schema";
import { validateRequest } from "../middlewares/validation.middleware";

const router = Router();

router.get("/", getUser);
router.post("/", createUserSchema, validateRequest, createNewUser);

export default router;
