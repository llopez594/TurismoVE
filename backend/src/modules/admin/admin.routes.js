import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { approvePlace, getPendingPlaces, rejectPlace } from "./admin.controller.js";

const router = Router();

router.get("/places/pending", authenticate, authorizeRoles("admin"), getPendingPlaces);
router.patch("/places/:id/approve", authenticate, authorizeRoles("admin"), approvePlace);
router.patch("/places/:id/reject", authenticate, authorizeRoles("admin"), rejectPlace);

export default router;
