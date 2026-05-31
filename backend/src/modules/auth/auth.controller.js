import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { User } from "../../models/index.js";

function buildToken(user) {
    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        env.jwtSecret,
        {
            expiresIn: "2h"
        }
    );
}

function publicUser(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "avatar1.png",
        createdAt: user.createdAt
    };
}

export async function register(req, res) {
    const { name, email, password, avatar } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Nombre, correo y contraseña son obligatorios."
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "La contraseña debe tener al menos 6 caracteres."
        });
    }

    try {
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            return res.status(409).json({
                message: "El correo ya está registrado."
            });
        }

        const newUser = await User.create({
            name,
            email,
            passwordHash: bcrypt.hashSync(password, 10),
            role: "user",
            avatar: avatar || "avatar1.png"
        });

        return res.status(201).json({
            message: "Usuario registrado correctamente.",
            user: publicUser(newUser),
            token: buildToken(newUser)
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al registrar el usuario.",
            error: error.message
        });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Correo y contraseña son obligatorios."
        });
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({
                message: "Credenciales inválidas."
            });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.passwordHash);

        if (!passwordIsValid) {
            return res.status(401).json({
                message: "Credenciales inválidas."
            });
        }

        return res.status(200).json({
            message: "Inicio de sesión correcto.",
            user: publicUser(user),
            token: buildToken(user)
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al iniciar sesión.",
            error: error.message
        });
    }
}

export function me(req, res) {
    return res.status(200).json({
        user: req.user
    });
}
