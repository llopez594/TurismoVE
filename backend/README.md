# TurismoVE — Backend

Backend API REST para el proyecto integrador **TurismoVE**, una plataforma web para registrar, organizar y promocionar sitios turísticos, experiencias y servicios relacionados con el turismo en Venezuela.

---

## Stack tecnológico

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Base de datos:** MySQL (Laragon local / AlwaysData producción)
- **ORM:** Sequelize + Sequelize CLI
- **Autenticación:** JWT (jsonwebtoken) + bcrypt
- **Seguridad:** Helmet, CORS, Express Rate Limit
- **Caché:** node-cache en memoria
- **Despliegue:** Koyeb (rama `production`)

---

## Requisitos previos

- Node.js v18 o superior
- MySQL corriendo localmente (Laragon recomendado)
- Base de datos `turismove` creada en MySQL

---

## Instalación local

```bash
# 1. Clonar el repositorio y entrar al backend
git clone <url-del-repo>
cd TURISMOVE/backend

# 2. Instalar dependencias
npm install

# 3. Crear el archivo de entorno
cp .env.example .env
# Editar .env con tus valores locales

# 4. Correr migraciones (crea las tablas)
npm run db:migrate

# 5. Correr seeders (admin + categorías iniciales)
npm run db:seed

# 6. Iniciar el servidor en modo desarrollo
npm run dev
```

El servidor quedará disponible en: `http://localhost:4000`

---

## Variables de entorno

Crear un archivo `.env` basado en `.env.example`:

```env
NODE_ENV=development
PORT=4000

# MySQL local con Laragon (sin contraseña por defecto)
DATABASE_URL=mysql://root:@localhost:3306/turismove

# JWT
JWT_SECRET=cambia_esto_por_una_clave_secreta_segura

# Frontend
FRONTEND_URL=http://localhost:5173
```

---

## Scripts disponibles

| Script                    | Descripción                                         |
| ------------------------- | --------------------------------------------------- |
| `npm run dev`             | Inicia el servidor con nodemon (recarga automática) |
| `npm start`               | Inicia el servidor en producción                    |
| `npm run db:check`        | Verifica la conexión a la base de datos             |
| `npm run db:migrate`      | Ejecuta las migraciones pendientes                  |
| `npm run db:migrate:undo` | Revierte la última migración                        |
| `npm run db:seed`         | Inserta datos iniciales (admin + categorías)        |
| `npm run db:seed:undo`    | Revierte los seeders                                |

---

## Estructura del proyecto

```
backend/
├── src/
│   ├── config/
│   │   └── env.js                  Variables de entorno centralizadas
│   ├── data/
│   │   └── memory.js               Datos en memoria (referencia, ya no en uso activo)
│   ├── database/
│   │   ├── migrations/             Migraciones Sequelize (.cjs)
│   │   ├── seeders/                Seeders con datos iniciales (.cjs)
│   │   ├── config.cjs              Configuración de Sequelize CLI
│   │   ├── connection.js           Instancia de Sequelize
│   │   └── check.js                Script de verificación de conexión
│   ├── middlewares/
│   │   ├── auth.middleware.js      Verificación de JWT
│   │   ├── cache.middleware.js     Caché en memoria
│   │   ├── error.middleware.js     Manejo de errores y 404
│   │   └── role.middleware.js      Autorización por rol
│   ├── models/
│   │   ├── user.model.js
│   │   ├── category.model.js
│   │   ├── place.model.js
│   │   ├── review.model.js
│   │   ├── photo.model.js
│   │   └── index.js                Asociaciones entre modelos
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   └── auth.routes.js
│   │   ├── categories/
│   │   │   ├── categories.controller.js
│   │   │   └── categories.routes.js
│   │   ├── places/
│   │   │   ├── places.controller.js
│   │   │   └── places.routes.js
│   │   ├── reviews/
│   │   │   ├── reviews.controller.js
│   │   │   └── reviews.routes.js
│   │   ├── ai/
│   │   │   ├── ai.controller.js
│   │   │   └── ai.routes.js
│   │   └── admin/
│   │       ├── admin.controller.js
│   │       └── admin.routes.js
│   ├── app.js                      Configuración de Express
│   ├── routes.js                   Registro de rutas
│   └── server.js                   Punto de entrada
├── docs/
│   ├── arquitectura.md
│   ├── endpoints.md
│   └── deploy.md
├── .env.example
├── .sequelizerc
├── package.json
└── README.md
```

---

## Endpoints disponibles

### Públicos

| Método | Endpoint               | Descripción                |
| ------ | ---------------------- | -------------------------- |
| GET    | `/api/health`          | Estado del servidor        |
| GET    | `/api/database/status` | Estado de la base de datos |
| POST   | `/api/auth/register`   | Registro de usuario        |
| POST   | `/api/auth/login`      | Inicio de sesión           |
| GET    | `/api/categories`      | Listar categorías          |
| GET    | `/api/places`          | Listar lugares aprobados   |
| GET    | `/api/places/:id`      | Detalle de un lugar        |
| GET    | `/api/places/:id/reviews` | Listar reseñas de un lugar |
| POST   | `/api/ai/chat`         | Chat turístico con IA      |

### Requieren JWT

| Método | Endpoint                               | Descripción                   |
| ------ | -------------------------------------- | ----------------------------- |
| GET    | `/api/auth/me`                         | Datos del usuario autenticado |
| POST   | `/api/places`                          | Publicar un nuevo lugar       |
| POST   | `/api/places/:id/reviews`              | Publicar una reseña           |
| DELETE | `/api/places/:id/reviews/:reviewId`    | Eliminar una reseña propia    |

### Requieren JWT + rol admin

| Método | Endpoint                        | Descripción               |
| ------ | ------------------------------- | ------------------------- |
| POST   | `/api/categories`               | Crear categoría           |
| GET    | `/api/admin/places/pending`     | Listar lugares pendientes |
| PATCH  | `/api/admin/places/:id/approve` | Aprobar un lugar          |
| PATCH  | `/api/admin/places/:id/reject`  | Rechazar un lugar         |

Para los endpoints protegidos enviar el header:
```
Authorization: Bearer <token>
```

---

## Autenticación y roles

| Rol                | Permisos                                                       |
| ------------------ | -------------------------------------------------------------- |
| Visitante          | Consultar lugares y categorías                                 |
| Usuario registrado | Todo lo anterior + publicar lugares                            |
| Administrador      | Todo lo anterior + aprobar/rechazar lugares y crear categorías |

Usuario administrador de prueba:

```
Correo:     admin@turismove.com
Contraseña: Admin1234
```

---

## Base de datos

El proyecto usa MySQL con Sequelize. Las tablas son:

- `users` — Usuarios registrados
- `categories` — Categorías turísticas
- `places` — Lugares y actividades turísticas
- `reviews` — Reseñas y calificaciones
- `photos` — Fotos de lugares *(modelo y tabla disponibles; endpoints pendientes)*

Las migraciones y seeders usan la extensión `.cjs` porque el proyecto tiene `"type": "module"` en `package.json` y Sequelize CLI no soporta ES Modules nativos.

---

## Despliegue en producción (Koyeb)

Configuración usada:

```
Build option:   Buildpack
Branch:         production
Work directory: backend
Build command:  npm ci
Run command:    npm start
Port:           8000
```

Variables de entorno en Koyeb:

```
NODE_ENV=production
PORT=8000
DATABASE_URL=mysql://USUARIO:PASSWORD@mysql-USUARIO.alwaysdata.net:3306/USUARIO_turismove
JWT_SECRET=<clave_secreta_segura>
FRONTEND_URL=https://<url-del-frontend>
```

---

## Estado del proyecto

| Módulo                                              | Estado      |
| --------------------------------------------------- | ----------- |
| Autenticación (registro, login, me)                 | ✅ Completo  |
| Categorías (listar, crear)                          | ✅ Completo  |
| Lugares (listar, detalle, crear, aprobar, rechazar) | ✅ Completo  |
| Base de datos MySQL conectada                       | ✅ Completo  |
| Migraciones y seeders                               | ✅ Completo  |
| Reseñas                                             | ✅ Completo  |
| Fotos                                               | 🔜 Pendiente |
| Integración IA                                      | ✅ Completo  |
