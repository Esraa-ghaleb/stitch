import { Router } from "express";
import { getEditorials, getEditorialBySlug } from "../controllers/editorialController.js";

const router = Router();

router.get("/", getEditorials);
router.get("/:slug", getEditorialBySlug);

export default router;
