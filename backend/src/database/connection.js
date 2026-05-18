import { Sequelize } from "sequelize";
import "dotenv/config";

const isProduction = process.env.NODE_ENV === "production";

export const sequelize = new Sequelize(
    process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/turismove",
    {
        dialect: "postgres",
        logging: false,
        dialectOptions: isProduction
        ? {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
        : {}
    }
);

export async function testDatabaseConnection() {
    try {
        await sequelize.authenticate();

        return {
            connected: true,
            message: "Conexión a PostgreSQL establecida correctamente."
        };
    } catch (error) {
        return {
            connected: false,
            message: "No se pudo conectar a PostgreSQL.",
            error: error.message
        };
    }
}