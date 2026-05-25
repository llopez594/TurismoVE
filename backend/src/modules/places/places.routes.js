import { Router } from "express";
import { Op } from "sequelize";
import { Place, Category, User } from "../../models/index.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { cache, clearCache } from "../../middlewares/cache.middleware.js";

const router = Router();

router.get("/", cache(120), async (req, res) => {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : null;
    const search = req.query.search ? String(req.query.search).trim() : "";

    const where = { status: "approved" };

    if (categoryId) {
        where.categoryId = categoryId;
    }

    if (search) {
        where[Op.or] = [
            { title: { [Op.like]: `%${search}%` } },
            { location: { [Op.like]: `%${search}%` } }
        ];
    }

    try {
        const { count, rows } = await Place.findAndCountAll({
            where,
            include: [
                {
                    model: Category,
                    as: "category",
                    attributes: ["id", "name"]
                }
            ],
            order: [["createdAt", "DESC"]],
            limit,
            offset: (page - 1) * limit
        });

        return res.status(200).json({
            page,
            limit,
            total: count,
            data: rows
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener los lugares.",
            error: error.message
        });
    }
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);

    try {
        const place = await Place.findOne({
            where: { id, status: "approved" },
            include: [
                {
                    model: Category,
                    as: "category",
                    attributes: ["id", "name"]
                },
                {
                    model: User,
                    as: "author",
                    attributes: ["id", "name"]
                }
            ]
        });

        if (!place) {
            return res.status(404).json({
                message: "Lugar turístico no encontrado."
            });
        }

        return res.status(200).json({
            data: place
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener el lugar.",
            error: error.message
        });
    }
});

router.post("/", authenticate, async (req, res) => {
    const { title, description, location, categoryId, type } = req.body;

    if (!title || !description || !location || !categoryId) {
        return res.status(400).json({
            message: "Título, descripción, ubicación y categoría son obligatorios."
        });
    }

    try {
        const categoryExists = await Category.findByPk(categoryId);

        if (!categoryExists) {
            return res.status(400).json({
                message: "La categoría seleccionada no existe."
            });
        }

        const newPlace = await Place.create({
            title,
            description,
            location,
            categoryId: Number(categoryId),
            type: type || "lugar",
            ratingAverage: 0,
            status: "pending",
            userId: req.user.id
        });

        clearCache();

        return res.status(201).json({
            message: "Lugar enviado correctamente. Queda pendiente de aprobación.",
            data: newPlace
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear el lugar.",
            error: error.message
        });
    }
});

export default router;