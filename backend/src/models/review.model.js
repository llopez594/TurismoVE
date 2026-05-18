import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const Review = sequelize.define(
    "Review",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        tableName: "reviews",
        underscored: true,
        timestamps: true
    }
);