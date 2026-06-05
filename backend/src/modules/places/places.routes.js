import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { cache } from "../../middlewares/cache.middleware.js";
import {
    createPlace,
    deletePlace,
    getPlaceById,
    getPlaces,
    updatePlace
} from "./places.controller.js";

const router = Router();

router.get("/", cache(120), getPlaces);
router.get("/:id", getPlaceById);
router.post("/", authenticate, createPlace);
router.put("/:id", authenticate, updatePlace);
router.delete("/:id", authenticate, deletePlace);

export default router;
