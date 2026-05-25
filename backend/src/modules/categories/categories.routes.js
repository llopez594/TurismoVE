import { Router } from "express";
import { Category } from "../../models/index.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { cache, clearCache } from "../../middlewares/cache.middleware.js";

const router = Router();

router.get("/", cache(300), async (req, res) => {
    try {
        const categories = await Category.findAll({
            order: [["name", "ASC"]]
        });

        return res.status(200).json({
            total: categories.length,
            data: categories
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener las categorías.",
            error: error.message
        });
    }
});

router.post("/", authenticate, authorizeRoles("admin"), async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "El nombre de la categoría es obligatorio."
        });
    }

    try {
        const exists = await Category.findOne({ where: { name } });

        if (exists) {
            return res.status(409).json({
                message: "Ya existe una categoría con ese nombre."
            });
        }

        const newCategory = await Category.create({
            name,
            description: description || null
        });

        clearCache();

        return res.status(201).json({
            message: "Categoría creada correctamente.",
            data: newCategory
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear la categoría.",
            error: error.message
        });
    }
});

export default router;