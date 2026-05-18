import "dotenv/config";

export const env = {
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET || "turismove_secret_key",
    nodeEnv: process.env.NODE_ENV || "development",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173"
};