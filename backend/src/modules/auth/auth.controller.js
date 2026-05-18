import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { users } from "../../data/memory.js";

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
        createdAt: user.createdAt
    };
}

export function register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Nombre, correo y contraseña son obligatorios."
        });
    }

    const userExists = users.some((user) => user.email === email);

    if (userExists) {
        return res.status(409).json({
            message: "El correo ya está registrado."
        });
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        passwordHash: bcrypt.hashSync(password, 10),
        role: "user",
        createdAt: new Date().toISOString()
    };

    users.push(newUser);

    return res.status(201).json({
        message: "Usuario registrado correctamente.",
        user: publicUser(newUser),
        token: buildToken(newUser)
    });
}

export function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Correo y contraseña son obligatorios."
        });
    }

    const user = users.find((item) => item.email === email);

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
}

export function me(req, res) {
    return res.status(200).json({
        user: req.user
    });
}