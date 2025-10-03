import { Router } from "express";
import { validateRequest } from "../middlewares/validation.middleware";
import {
  refreshToken,
  registerUser,
  signin,
} from "../controllers/auth.controller";
import { loginSchema, registerUserSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/register", registerUserSchema, validateRequest, registerUser);
router.post("/login", loginSchema, validateRequest, signin);
router.get("/refresh-token", refreshToken);

export default router;
