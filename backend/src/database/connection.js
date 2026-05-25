import { Sequelize } from "sequelize";
import "dotenv/config";

const defaultUrl = "mysql://root:@localhost:3306/turismove";

export const sequelize = new Sequelize(
    process.env.DATABASE_URL || defaultUrl,
    {
        dialect: "mysql",
        logging: false
    }
);

export async function testDatabaseConnection() {
    try {
        await sequelize.authenticate();

        return {
            connected: true,
            message: "Conexión a MySQL establecida correctamente."
        };
    } catch (error) {
        return {
            connected: false,
            message: "No se pudo conectar a MySQL.",
            error: error.message
        };
    }
}
