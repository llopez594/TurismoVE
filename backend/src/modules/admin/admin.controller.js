import { Place, Category, User } from "../../models/index.js";
import { clearCache } from "../../middlewares/cache.middleware.js";

export async function getPendingPlaces(req, res) {
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
}

export async function approvePlace(req, res) {
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
}

export async function rejectPlace(req, res) {
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
}
