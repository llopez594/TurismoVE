import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { getReviewsByPlace, createReview, updateReview, deleteReview } from "./reviews.controller.js";

const router = Router({ mergeParams: true });

// GET /api/places/:id/reviews
router.get("/", getReviewsByPlace);

// POST /api/places/:id/reviews
router.post("/", authenticate, createReview);

// PUT /api/places/:id/reviews/:reviewId
router.put("/:reviewId", authenticate, updateReview);

// DELETE /api/places/:id/reviews/:reviewId
router.delete("/:reviewId", authenticate, deleteReview);

export default router;
