# TurismoVE Backend

Backend API REST para el proyecto integrador **TurismoVE**, una plataforma web para registrar, organizar y promocionar sitios turísticos, experiencias y servicios relacionados con el turismo en Venezuela.

## Stack tecnológico

- Node.js
- Express.js
- JWT para autenticación
- Bcrypt para encriptación de contraseñas
- CORS
- Morgan
- Caché básico en memoria
- Arquitectura modular

## Módulos implementados

- Auth
- Categorías
- Lugares turísticos
- Administración
- Middlewares de autenticación, autorización, caché y manejo de errores

## Autenticación y autorización

El sistema usa autenticación mediante JWT.

Roles definidos:

- Visitante: puede consultar lugares y categorías.
- Usuario registrado: puede publicar lugares turísticos.
- Administrador: puede gestionar categorías y aprobar o rechazar lugares.

Usuario administrador de prueba:

```txt
Correo: admin@turismove.com
Contraseña: Admin1234