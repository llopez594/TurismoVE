import { Op } from "sequelize";
import { Place, Category, User } from "../../models/index.js";
import { clearCache } from "../../middlewares/cache.middleware.js";

function parseServices(item) {
    return Array.isArray(item.services)
        ? item.services
        : item.services
            ? typeof item.services === "string"
                ? (() => {
                    try { return JSON.parse(item.services); } catch (e) { return []; }
                })()
                : item.services
            : [];
}

export async function getPendingPlaces(req, res) {
    try {
        const pendingPlaces = await Place.findAll({
            where: { status: "pending", type: "lugar" },
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

export async function getAdminPlaces(req, res) {
    const search = req.query.search ? String(req.query.search).trim() : "";
    const userId = req.query.userId ? Number(req.query.userId) : null;
    const status = req.query.status ? String(req.query.status) : "";

    const where = { type: "lugar" };
    if (userId) where.userId = userId;
    if (status) where.status = status;
    if (search) {
        where[Op.or] = [
            { title: { [Op.like]: `%${search}%` } },
            { location: { [Op.like]: `%${search}%` } },
            { address: { [Op.like]: `%${search}%` } }
        ];
    }

    try {
        const places = await Place.findAll({
            where,
            include: [
                {
                    model: Category,
                    as: "category",
                    attributes: ["id", "name"]
                },
                {
                    model: User,
                    as: "author",
                    attributes: ["id", "name", "email", "avatar", "role"]
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        return res.status(200).json({
            total: places.length,
            data: places.map((place) => {
                const item = place.get({ plain: true });
                return {
                    ...item,
                    services: parseServices(item)
                };
            })
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener las publicaciones.",
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

export async function getUsers(req, res) {
    try {
        const users = await User.findAll({
            attributes: ["id", "name", "email", "role", "avatar", "createdAt"],
            order: [["createdAt", "DESC"]]
        });

        return res.status(200).json({
            total: users.length,
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener los usuarios.",
            error: error.message
        });
    }
}

export async function updateUserRole(req, res) {
    const id = Number(req.params.id);
    const { role } = req.body;
    const allowedRoles = ["user", "content_creator", "admin"];

    if (!allowedRoles.includes(role)) {
        return res.status(400).json({
            message: "Rol inválido."
        });
    }

    if (id === req.user.id && role !== "admin") {
        return res.status(400).json({
            message: "No puedes quitarte el rol administrador a ti mismo."
        });
    }

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado."
            });
        }

        await user.update({ role });

        return res.status(200).json({
            message: "Rol actualizado correctamente.",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar el rol.",
            error: error.message
        });
    }
}
