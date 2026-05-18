import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { users } from "../data/memory.js";

export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "No autorizado. Token no enviado."
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, env.jwtSecret);
        const user = users.find((item) => item.id === payload.id);

        if (!user) {
        return res.status(401).json({
            message: "No autorizado. Usuario no encontrado."
        });
        }

        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        next();
    } catch {
        return res.status(401).json({
            message: "No autorizado. Token inválido o expirado."
        });
    }
}