import { Router } from "express";
import { register, login, logout, getMe } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/errorMiddleware.js";
import { registerValidation, loginValidation } from "../validators/index.js";

const router = Router();

router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);

export default router;
