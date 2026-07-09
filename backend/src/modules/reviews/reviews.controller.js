import { Review, User, Place } from "../../models/index.js";
import { clearCache } from "../../middlewares/cache.middleware.js";

export async function updateReview(req, res) {
    const placeId = Number(req.params.id);
    const reviewId = Number(req.params.reviewId);
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({
            message: "La calificación debe ser un número entre 1 y 5."
        });
    }

    try {
        const review = await Review.findOne({
            where: { id: reviewId, placeId, userId: req.user.id }
        });

        if (!review) {
            return res.status(404).json({
                message: "Reseña no encontrada o no tienes permiso para editarla."
            });
        }

        await review.update({
            rating: Number(rating),
            comment: comment || null
        });

        // Recalcular rating promedio del lugar
        const allReviews = await Review.findAll({ where: { placeId } });
        const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
        await Place.update(
            { ratingAverage: parseFloat(avg.toFixed(2)) },
            { where: { id: placeId } }
        );
        clearCache();

        const updated = await Review.findByPk(reviewId, {
            include: [{ model: User, as: "author", attributes: ["id", "name", "avatar"] }]
        });

        return res.status(200).json({
            message: "Reseña actualizada correctamente.",
            data: updated
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar la reseña.",
            error: error.message
        });
    }
}

export async function getReviewsByPlace(req, res) {
    const placeId = Number(req.params.id);

    try {
        const reviews = await Review.findAll({
            where: { placeId },
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: ["id", "name", "avatar"]
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        return res.status(200).json({
            total: reviews.length,
            data: reviews
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener las reseñas.",
            error: error.message
        });
    }
}

export async function createReview(req, res) {
    const placeId = Number(req.params.id);
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({
            message: "La calificación debe ser un número entre 1 y 5."
        });
    }

    try {
        const place = await Place.findOne({
            where: { id: placeId, status: "approved" }
        });

        if (!place) {
            return res.status(404).json({
                message: "Lugar no encontrado."
            });
        }

        const existing = await Review.findOne({
            where: { placeId, userId: req.user.id }
        });

        if (existing) {
            return res.status(409).json({
                message: "Ya tienes una reseña para este lugar. Puedes editarla."
            });
        }

        const review = await Review.create({
            placeId,
            userId: req.user.id,
            rating: Number(rating),
            comment: comment || null
        });

        // Actualizar el rating promedio del lugar
        const allReviews = await Review.findAll({ where: { placeId } });
        const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

        await place.update({ ratingAverage: parseFloat(avg.toFixed(2)) });
        clearCache();

        const reviewWithAuthor = await Review.findByPk(review.id, {
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: ["id", "name", "avatar"]
                }
            ]
        });

        return res.status(201).json({
            message: "Reseña publicada correctamente.",
            data: reviewWithAuthor
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear la reseña.",
            error: error.message
        });
    }
}

export async function deleteReview(req, res) {
    const id = Number(req.params.reviewId);

    try {
        const review = await Review.findOne({
            where: { id, userId: req.user.id }
        });

        if (!review) {
            return res.status(404).json({
                message: "Reseña no encontrada o no tienes permiso para eliminarla."
            });
        }

        const placeId = review.placeId;
        await review.destroy();

        // Recalcular rating promedio
        const allReviews = await Review.findAll({ where: { placeId } });
        const avg = allReviews.length > 0
            ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
            : 0;

        await Place.update(
            { ratingAverage: parseFloat(avg.toFixed(2)) },
            { where: { id: placeId } }
        );
        clearCache();

        return res.status(200).json({
            message: "Reseña eliminada correctamente."
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar la reseña.",
            error: error.message
        });
    }
}
