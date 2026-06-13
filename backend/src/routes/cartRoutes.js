import { Router } from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/errorMiddleware.js";
import { cartAddValidation, cartUpdateValidation } from "../validators/index.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getCart);
router.post("/", cartAddValidation, validate, addToCart);
router.patch("/items/:itemId", cartUpdateValidation, validate, updateCartItem);
router.delete("/items/:itemId", removeCartItem);
router.delete("/", clearCart);

export default router;
