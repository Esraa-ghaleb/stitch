import { Router } from "express";
import {
  getServices,
  getServicesByCategory,
  getServiceById,
} from "../controllers/serviceController.js";

const router = Router();

router.get("/", getServices);
router.get("/category/:category", getServicesByCategory);
router.get("/:id", getServiceById);

export default router;
