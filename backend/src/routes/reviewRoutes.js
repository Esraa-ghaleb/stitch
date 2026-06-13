import { Router } from "express";
import { createReview, getReviews } from "../controllers/reviewController.js";
import { optionalAuth } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/errorMiddleware.js";
import { reviewValidation } from "../validators/index.js";

const router = Router();

router.get("/service/:serviceId", getReviews);
router.post("/", optionalAuth, reviewValidation, validate, createReview);

export default router;
