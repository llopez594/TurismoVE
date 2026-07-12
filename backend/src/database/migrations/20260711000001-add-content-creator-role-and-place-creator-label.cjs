"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn("users", "role", {
            type: Sequelize.ENUM("user", "content_creator", "admin"),
            allowNull: false,
            defaultValue: "user"
        });

        await queryInterface.addColumn("places", "created_by_label", {
            type: Sequelize.STRING(120),
            allowNull: true,
            defaultValue: null
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("places", "created_by_label");
        await queryInterface.changeColumn("users", "role", {
            type: Sequelize.ENUM("user", "admin"),
            allowNull: false,
            defaultValue: "user"
        });
    }
};
