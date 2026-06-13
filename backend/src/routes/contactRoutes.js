import { Router } from "express";
import { submitContact } from "../controllers/contactController.js";
import { validate } from "../middleware/errorMiddleware.js";
import { contactValidation } from "../validators/index.js";

const router = Router();

router.post("/", contactValidation, validate, submitContact);

export default router;
