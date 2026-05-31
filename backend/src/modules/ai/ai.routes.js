import { Router } from "express";
import { chat } from "./ai.controller.js";

const router = Router();

// POST /api/ai/chat
router.post("/chat", chat);

export default router;
