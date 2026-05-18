import { Router } from "express";
import { places } from "../../data/memory.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { clearCache } from "../../middlewares/cache.middleware.js";

const router = Router();

router.get("/places/pending", authenticate, authorizeRoles("admin"), (req, res) => {
    const pendingPlaces = places.filter((place) => place.status === "pending");

    return res.status(200).json({
        total: pendingPlaces.length,
        data: pendingPlaces
    });
});

router.patch("/places/:id/approve", authenticate, authorizeRoles("admin"), (req, res) => {
    const id = Number(req.params.id);
    const place = places.find((item) => item.id === id);

    if (!place) {
        return res.status(404).json({
            message: "Lugar turístico no encontrado."
        });
    }

    place.status = "approved";
    clearCache();

    return res.status(200).json({
        message: "Lugar aprobado correctamente.",
        data: place
    });
});

router.patch("/places/:id/reject", authenticate, authorizeRoles("admin"), (req, res) => {
    const id = Number(req.params.id);
    const place = places.find((item) => item.id === id);

    if (!place) {
        return res.status(404).json({
            message: "Lugar turístico no encontrado."
        });
    }

    place.status = "rejected";
    clearCache();

    return res.status(200).json({
        message: "Lugar rechazado correctamente.",
        data: place
    });
});

export default router;