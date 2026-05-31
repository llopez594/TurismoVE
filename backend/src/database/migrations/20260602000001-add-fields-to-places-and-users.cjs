"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Campos nuevos en places
        await queryInterface.addColumn("places", "cost", {
            type: Sequelize.DECIMAL(8, 2),
            allowNull: true,
            defaultValue: null
        });
        await queryInterface.addColumn("places", "address", {
            type: Sequelize.STRING(255),
            allowNull: true,
            defaultValue: null
        });
        await queryInterface.addColumn("places", "check_in", {
            type: Sequelize.STRING(10),
            allowNull: true,
            defaultValue: null
        });
        await queryInterface.addColumn("places", "check_out", {
            type: Sequelize.STRING(10),
            allowNull: true,
            defaultValue: null
        });
        await queryInterface.addColumn("places", "services", {
            type: Sequelize.JSON,
            allowNull: true,
            defaultValue: null
        });

        // Campo nuevo en users
        await queryInterface.addColumn("users", "avatar", {
            type: Sequelize.STRING(50),
            allowNull: true,
            defaultValue: "avatar1.png"
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn("places", "cost");
        await queryInterface.removeColumn("places", "address");
        await queryInterface.removeColumn("places", "check_in");
        await queryInterface.removeColumn("places", "check_out");
        await queryInterface.removeColumn("places", "services");
        await queryInterface.removeColumn("users", "avatar");
    }
};
