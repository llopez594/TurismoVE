import { Router } from "express";
import { places } from "../../data/memory.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { cache, clearCache } from "../../middlewares/cache.middleware.js";

const router = Router();

router.get("/", cache(120), (req, res) => {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : null;
    const search = req.query.search ? String(req.query.search).toLowerCase() : "";

    let filteredPlaces = places.filter((place) => place.status === "approved");

    if (categoryId) {
        filteredPlaces = filteredPlaces.filter((place) => place.categoryId === categoryId);
    }

    if (search) {
        filteredPlaces = filteredPlaces.filter((place) => {
        return (
            place.title.toLowerCase().includes(search) ||
            place.location.toLowerCase().includes(search)
        );
        });
    }

    const start = (page - 1) * limit;
    const paginated = filteredPlaces.slice(start, start + limit);

    return res.status(200).json({
        page,
        limit,
        total: filteredPlaces.length,
        data: paginated
    });
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const place = places.find((item) => item.id === id && item.status === "approved");

    if (!place) {
        return res.status(404).json({
            message: "Lugar turístico no encontrado."
        });
    }

    return res.status(200).json({
        data: place
    });
});

router.post("/", authenticate, (req, res) => {
    const { title, description, location, categoryId, type } = req.body;

    if (!title || !description || !location || !categoryId) {
        return res.status(400).json({
            message: "Título, descripción, ubicación y categoría son obligatorios."
        });
    }

    const newPlace = {
        id: Date.now(),
        title,
        description,
        location,
        categoryId: Number(categoryId),
        type: type || "lugar",
        ratingAverage: 0,
        status: "pending",
        createdBy: req.user.id,
        createdAt: new Date().toISOString()
    };

    places.push(newPlace);
    clearCache();

    return res.status(201).json({
        message: "Lugar enviado correctamente. Queda pendiente de aprobación.",
        data: newPlace
    });
});

export default router;