import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { cache } from "../../middlewares/cache.middleware.js";
import {
    createPlace,
    deletePlace,
    getPlaceById,
    getPlaces,
    updatePlace,
    getUserPlaces
} from "./places.controller.js";

const router = Router();

router.get("/", cache(120), getPlaces);
router.get("/user/me", authenticate, getUserPlaces);
router.get("/:id", getPlaceById);
router.post("/", authenticate, authorizeRoles("content_creator", "admin"), createPlace);
router.put("/:id", authenticate, updatePlace);
router.delete("/:id", authenticate, deletePlace);

export default router;
