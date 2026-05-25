import { Router } from "express";
import { Place, Category, User } from "../../models/index.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { clearCache } from "../../middlewares/cache.middleware.js";

const router = Router();

router.get("/places/pending", authenticate, authorizeRoles("admin"), async (req, res) => {
    try {
        const pendingPlaces = await Place.findAll({
            where: { status: "pending" },
            include: [
                {
                    model: Category,
                    as: "category",
                    attributes: ["id", "name"]
                },
                {
                    model: User,
                    as: "author",
                    attributes: ["id", "name", "email"]
                }
            ],
            order: [["createdAt", "ASC"]]
        });

        return res.status(200).json({
            total: pendingPlaces.length,
            data: pendingPlaces
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener los lugares pendientes.",
            error: error.message
        });
    }
});

router.patch("/places/:id/approve", authenticate, authorizeRoles("admin"), async (req, res) => {
    const id = Number(req.params.id);

    try {
        const place = await Place.findByPk(id);

        if (!place) {
            return res.status(404).json({
                message: "Lugar turístico no encontrado."
            });
        }

        await place.update({ status: "approved" });
        clearCache();

        return res.status(200).json({
            message: "Lugar aprobado correctamente.",
            data: place
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al aprobar el lugar.",
            error: error.message
        });
    }
});

router.patch("/places/:id/reject", authenticate, authorizeRoles("admin"), async (req, res) => {
    const id = Number(req.params.id);

    try {
        const place = await Place.findByPk(id);

        if (!place) {
            return res.status(404).json({
                message: "Lugar turístico no encontrado."
            });
        }

        await place.update({ status: "rejected" });
        clearCache();

        return res.status(200).json({
            message: "Lugar rechazado correctamente.",
            data: place
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al rechazar el lugar.",
            error: error.message
        });
    }
});

export default router;