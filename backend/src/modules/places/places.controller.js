import { Op } from "sequelize";
import { Place, Category, User } from "../../models/index.js";
import { clearCache } from "../../middlewares/cache.middleware.js";

export async function getPlaces(req, res) {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : null;
    const search = req.query.search ? String(req.query.search).trim() : "";
    const type = req.query.type || null;

    const where = { status: "approved" };

    if (categoryId) {
        where.categoryId = categoryId;
    }

    if (type) {
        where.type = type;
    }

    if (search) {
        where[Op.or] = [
            { title: { [Op.like]: `%${search}%` } },
            { location: { [Op.like]: `%${search}%` } },
            { address: { [Op.like]: `%${search}%` } }
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
            data: rows.map((place) => {
                const item = place.get({ plain: true });

                return {
                    ...item,
                    services: Array.isArray(item.services)
                        ? item.services
                        : item.services
                            ? JSON.parse(item.services)
                            : []
        };
    })
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener los lugares.",
            error: error.message
        });
    }
}

export async function getPlaceById(req, res) {
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
                    attributes: ["id", "name", "avatar"]
                }
            ]
        });

        if (!place) {
            return res.status(404).json({
                message: "Lugar turístico no encontrado."
            });
        }

        // return res.status(200).json({
        //     data: place
        // }); Se cambio estas lineas por las de abajo, ya que es un String que contiene un JSON no es un array 
        const item = place.get({ plain: true });

        return res.status(200).json({
            data: {
                ...item,
                services: Array.isArray(item.services)
                    ? item.services
                    : item.services
                        ? typeof item.services === "string"
                            ? (() => {
                                try { return JSON.parse(item.services); } catch (e) { return []; }
                              })()
                            : item.services
                        : []
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener el lugar.",
            error: error.message
        });
    }
}

export async function createPlace(req, res) {
    const {
        title,
        description,
        location,
        address,
        categoryId,
        type,
        cost,
        checkIn,
        checkOut,
        services
    } = req.body;

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
            address: address || null,
            categoryId: Number(categoryId),
            type: type || "lugar",
            cost: cost ? Number(cost) : null,
            checkIn: checkIn || null,
            checkOut: checkOut || null,
            services: services || null,
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
}

export async function updatePlace(req, res) {
    const id = Number(req.params.id);

    try {
        const place = await Place.findOne({
            where: { id, userId: req.user.id }
        });

        if (!place) {
            return res.status(404).json({
                message: "Lugar no encontrado o no tienes permiso para editarlo."
            });
        }

        const {
            title,
            description,
            location,
            address,
            categoryId,
            type,
            cost,
            checkIn,
            checkOut,
            services
        } = req.body;

        await place.update({
            title: title || place.title,
            description: description || place.description,
            location: location || place.location,
            address: address !== undefined ? address : place.address,
            categoryId: categoryId ? Number(categoryId) : place.categoryId,
            type: type || place.type,
            cost: cost !== undefined ? Number(cost) : place.cost,
            checkIn: checkIn !== undefined ? checkIn : place.checkIn,
            checkOut: checkOut !== undefined ? checkOut : place.checkOut,
            services: services !== undefined ? services : place.services
        });

        clearCache();

        return res.status(200).json({
            message: "Lugar actualizado correctamente.",
            data: place
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar el lugar.",
            error: error.message
        });
    }
}

export async function deletePlace(req, res) {
    const id = Number(req.params.id);

    try {
        const place = await Place.findOne({
            where: { id, userId: req.user.id }
        });

        if (!place) {
            return res.status(404).json({
                message: "Lugar no encontrado o no tienes permiso para eliminarlo."
            });
        }

        await place.destroy();
        clearCache();

        return res.status(200).json({
            message: "Lugar eliminado correctamente."
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar el lugar.",
            error: error.message
        });
    }
}

export async function getUserPlaces(req, res) {
    try {
        const places = await Place.findAll({
            where: { userId: req.user.id },
            include: [
                {
                    model: Category,
                    as: "category",
                    attributes: ["id", "name"]
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        const parsedPlaces = places.map((place) => {
            const item = place.get({ plain: true });
            return {
                ...item,
                services: Array.isArray(item.services)
                    ? item.services
                    : item.services
                        ? typeof item.services === "string"
                            ? (() => {
                                try { return JSON.parse(item.services); } catch (e) { return []; }
                              })()
                            : item.services
                        : []
            };
        });

        return res.status(200).json({
            data: parsedPlaces
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener las publicaciones del usuario.",
            error: error.message
        });
    }
}

