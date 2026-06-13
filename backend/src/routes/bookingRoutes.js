import { Router } from "express";
import {
  createBooking,
  getBooking,
  updateBooking,
  confirmBooking,
  getMyBookings,
} from "../controllers/bookingController.js";
import { authMiddleware, optionalAuth } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/errorMiddleware.js";
import { bookingValidation } from "../validators/index.js";

const router = Router();

router.post("/", optionalAuth, bookingValidation, validate, createBooking);
router.get("/me", authMiddleware, getMyBookings);
router.get("/:id", getBooking);
router.patch("/:id", updateBooking);
router.post("/:id/confirm", confirmBooking);

export default router;
