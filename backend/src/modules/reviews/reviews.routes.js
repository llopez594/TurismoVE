import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { getReviewsByPlace, createReview, deleteReview } from "./reviews.controller.js";

const router = Router({ mergeParams: true });

// GET /api/places/:id/reviews
router.get("/", getReviewsByPlace);

// POST /api/places/:id/reviews
router.post("/", authenticate, createReview);

// DELETE /api/places/:id/reviews/:reviewId
router.delete("/:reviewId", authenticate, deleteReview);

export default router;
