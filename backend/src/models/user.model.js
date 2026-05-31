import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(160),
            allowNull: false,
            unique: true
        },
        passwordHash: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "password_hash"
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            allowNull: false,
            defaultValue: "user"
        },
        avatar: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: "avatar1.png"
        }
    },
    {
        tableName: "users",
        underscored: true,
        timestamps: true
    }
);
