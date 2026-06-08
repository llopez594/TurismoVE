# TurismoVE

Proyecto integrador de la materia Desarrollo Web 2026-I.

TurismoVE es una plataforma web para registrar, organizar y promocionar lugares turísticos, experiencias y servicios relacionados con el turismo en Venezuela.

## Estructura del proyecto

```txt
TurismoVE/
├── frontend/
├── backend/
└── docs/
```

## Stack propuesto

### Frontend

- React
- Vite
- CSS / Tailwind CSS

### Backend

- Node.js
- Express
- JWT
- Bcrypt
- CORS
- Caché básico en memoria

### Base de datos

- MySQL
- Sequelize + Sequelize CLI

## Funcionalidades iniciales

- Registro e inicio de sesión.
- Autenticación con JWT.
- Autorización por roles.
- Gestión de categorías.
- Registro de lugares turísticos.
- Aprobación o rechazo de lugares desde administración.
- Caché básico.
- Paginación y filtros.

## Documentación

La documentación se encuentra en la carpeta `docs/`.

- `docs/arquitectura.md`
- `docs/endpoints.md`
- `docs/deploy.md`

## Backend

Para ejecutar el backend:

```bash
cd backend
npm install
npm run dev
```

Servidor local:

```txt
http://localhost:4000
```

Health check:

```txt
http://localhost:4000/api/health
```

## Estado del proyecto

| Módulo                      | Estado       |
| --------------------------- | ------------ |
| Estructura frontend/backend | En proceso   |
| Backend inicial             | Implementado |
| Autenticación/autorización  | Implementado |
| Caché y optimizaciones      | Implementado |
| Diagrama de arquitectura    | Documentado  |
| Deploy                      | Preparado    |
