"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        // Insertar usuario administrador
        await queryInterface.bulkInsert("users", [
            {
                name: "Administrador TurismoVE",
                email: "admin@turismove.com",
                password_hash: bcrypt.hashSync("Admin1234", 10),
                role: "admin",
                created_at: new Date(),
                updated_at: new Date()
            },
            
            {
                name: "Creador TurismoVE",
                email: "creator@turismove.com",
                password_hash: bcrypt.hashSync("Creator1234", 10),
                role: "content_creator",
                created_at: new Date(),
                updated_at: new Date()
            },

            {
                name: "Usuario TurismoVE",
                email: "testuser@gmail.com",
                password_hash: bcrypt.hashSync("password123", 10),
                role: "user",
                created_at: new Date(),
                updated_at: new Date()
            }

        ]);

        // Insertar categorías iniciales
        await queryInterface.bulkInsert("categories", [
            {
                name: "Playas",
                description: "Playas, balnearios y zonas costeras de Venezuela.",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Sitios históricos",
                description: "Plazas, monumentos, cascos históricos y patrimonio cultural.",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Restaurantes y comida típica",
                description: "Gastronomía venezolana, restaurantes y experiencias culinarias.",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Experiencias y actividades",
                description: "Excursiones, paseos guiados, deportes acuáticos y aventura.",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Servicio de transporte",
                description: "Transporte turístico, traslados y servicios de movilidad.",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Sitios de recreación",
                description: "Parques, balnearios, zonas de esparcimiento y actividades familiares.",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Vida nocturna",
                description: "Bares, discotecas y espacios de entretenimiento nocturno.",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Compras y duty free",
                description: "Centros comerciales, tiendas duty free y mercados locales.",
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete("categories", null, {});
        await queryInterface.bulkDelete("users", null, {});
    }
};
