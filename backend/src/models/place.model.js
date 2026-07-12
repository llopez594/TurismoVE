import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const Place = sequelize.define(
    "Place",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(160),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING(180),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null
        },
        type: {
            type: DataTypes.ENUM("lugar", "actividad"),
            allowNull: false,
            defaultValue: "lugar"
        },
        cost: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: true,
            defaultValue: null
        },
        checkIn: {
            type: DataTypes.STRING(10),
            allowNull: true,
            defaultValue: null,
            field: "check_in"
        },
        checkOut: {
            type: DataTypes.STRING(10),
            allowNull: true,
            defaultValue: null,
            field: "check_out"
        },
        services: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: null
        },
        coverImage: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: "cover_image"
        },
        status: {
            type: DataTypes.ENUM("pending", "approved", "rejected"),
            allowNull: false,
            defaultValue: "pending"
        },
        ratingAverage: {
            type: DataTypes.DECIMAL(3, 2),
            allowNull: false,
            defaultValue: 0,
            field: "rating_average"
        },
        createdByLabel: {
            type: DataTypes.STRING(120),
            allowNull: true,
            defaultValue: null,
            field: "created_by_label"
        }
    },
    {
        tableName: "places",
        underscored: true,
        timestamps: true
    }
);
