import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const Photo = sequelize.define(
    "Photo",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(180),
            allowNull: true
        }
    },
    {
        tableName: "photos",
        underscored: true,
        timestamps: true
    }
);