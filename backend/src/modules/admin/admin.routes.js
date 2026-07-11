import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import {
    approvePlace,
    getAdminPlaces,
    getPendingPlaces,
    getUsers,
    rejectPlace,
    updateUserRole
} from "./admin.controller.js";

const router = Router();

router.get("/places/pending", authenticate, authorizeRoles("admin"), getPendingPlaces);
router.get("/places", authenticate, authorizeRoles("admin"), getAdminPlaces);
router.patch("/places/:id/approve", authenticate, authorizeRoles("admin"), approvePlace);
router.patch("/places/:id/reject", authenticate, authorizeRoles("admin"), rejectPlace);
router.get("/users", authenticate, authorizeRoles("admin"), getUsers);
router.patch("/users/:id/role", authenticate, authorizeRoles("admin"), updateUserRole);

export default router;
