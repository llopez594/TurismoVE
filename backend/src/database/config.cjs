require("dotenv").config();

const defaultDatabaseUrl = "mysql://root:@localhost:3306/turismove";

module.exports = {
    development: {
        url: process.env.DATABASE_URL || defaultDatabaseUrl,
        dialect: "mysql",
        logging: false
    },
    test: {
        url: process.env.DATABASE_URL || defaultDatabaseUrl,
        dialect: "mysql",
        logging: false
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: "mysql",
        logging: false
    }
};