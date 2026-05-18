import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import categoryRoutes from "./modules/categories/categories.routes.js";
import placeRoutes from "./modules/places/places.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import { checkDatabaseConfig } from "./database/connection.js";

const router = Router();

router.get("/health", (req, res) => {
    return res.status(200).json({
        status: "ok",
        service: "TurismoVE Backend",
        version: "1.0.0"
    });
});
router.get("/database/status", (req, res) => {
    return res.status(200).json(checkDatabaseConfig());
});

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/places", placeRoutes);
router.use("/admin", adminRoutes);

export default router;