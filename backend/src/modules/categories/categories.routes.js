import { Router } from "express";
import { categories } from "../../data/memory.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { cache, clearCache } from "../../middlewares/cache.middleware.js";

const router = Router();

router.get("/", cache(300), (req, res) => {
    return res.status(200).json({
        total: categories.length,
        data: categories
    });
});

router.post("/", authenticate, authorizeRoles("admin"), (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({
        message: "El nombre de la categoría es obligatorio."
        });
    }

    const newCategory = {
        id: Date.now(),
        name,
        description: description || ""
    };

    categories.push(newCategory);
    clearCache();

    return res.status(201).json({
        message: "Categoría creada correctamente.",
        data: newCategory
    });
});

export default router;