require("dotenv").config();

const defaultDatabaseUrl = "postgresql://postgres:postgres@localhost:5432/turismove";

module.exports = {
    development: {
        url: process.env.DATABASE_URL || defaultDatabaseUrl,
        dialect: "postgres",
        logging: false
    },
    test: {
        url: process.env.DATABASE_URL || defaultDatabaseUrl,
        dialect: "postgres",
        logging: false
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: "postgres",
        logging: false,
        dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
        }
    }
};