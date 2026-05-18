import "dotenv/config";

/**
 * Conexión futura a PostgreSQL.
 *
 * En esta primera etapa del proyecto, el backend usa datos en memoria
 * para demostrar arquitectura, autenticación, autorización, caché y rutas.
 */

export const databaseConfig = {
    provider: process.env.DB_PROVIDER || "postgresql",
    url: process.env.DATABASE_URL || null
};

export function checkDatabaseConfig() {
    if (!databaseConfig.url) {
        return {
        connected: false,
        message: "DATABASE_URL no configurada. El backend está usando datos en memoria."
        };
    }

    return {
        connected: false,
        message: "DATABASE_URL configurada. Conexión real pendiente para la fase de base de datos.",
        provider: databaseConfig.provider
    };
}