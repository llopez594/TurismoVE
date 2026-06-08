import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { cache } from "../../middlewares/cache.middleware.js";
import { createCategory, getCategories } from "./categories.controller.js";

const router = Router();

router.get("/", cache(300), getCategories);
router.post("/", authenticate, authorizeRoles("admin"), createCategory);

export default router;
