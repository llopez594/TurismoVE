# Endpoints del Backend - TurismoVE

## 1. URL base local

```txt
http://localhost:4000/api
```

## 2. Estado del servidor

### GET `/health`

Verifica que el backend esté funcionando.

**Respuesta esperada:**

```json
{
  "status": "ok",
  "service": "TurismoVE Backend",
  "version": "1.0.0"
}
```

---

# 3. Autenticación

## POST `/auth/register`

Registra un nuevo usuario.

**Body:**

```json
{
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "password": "123456"
}
```

**Respuesta esperada:**

```json
{
  "message": "Usuario registrado correctamente.",
  "user": {
    "id": 123,
    "name": "Juan Pérez",
    "email": "juan@email.com",
    "role": "user"
  },
  "token": "jwt_token"
}
```

---

## POST `/auth/login`

Inicia sesión.

**Body:**

```json
{
  "email": "admin@turismove.com",
  "password": "Admin1234"
}
```

**Respuesta esperada:**

```json
{
  "message": "Inicio de sesión correcto.",
  "user": {
    "id": 1,
    "name": "Administrador TurismoVE",
    "email": "admin@turismove.com",
    "role": "admin"
  },
  "token": "jwt_token"
}
```

---

## GET `/auth/me`

Obtiene la información del usuario autenticado.

**Requiere token:**

```txt
Authorization: Bearer jwt_token
```

**Respuesta esperada:**

```json
{
  "user": {
    "id": 1,
    "name": "Administrador TurismoVE",
    "email": "admin@turismove.com",
    "role": "admin"
  }
}
```

---

# 4. Categorías

## GET `/categories`

Lista las categorías turísticas.

**Ruta pública.**

**Respuesta esperada:**

```json
{
  "total": 4,
  "data": [
    {
      "id": 1,
      "name": "Playas",
      "description": "Playas, balnearios y zonas costeras de Venezuela."
    }
  ]
}
```

---

## POST `/categories`

Crea una nueva categoría turística.

**Ruta protegida. Solo administrador.**

**Headers:**

```txt
Authorization: Bearer jwt_token
```

**Body:**

```json
{
  "name": "Vida nocturna",
  "description": "Bares, discotecas y espacios de entretenimiento nocturno."
}
```

**Respuesta esperada:**

```json
{
  "message": "Categoría creada correctamente.",
  "data": {
    "id": 123,
    "name": "Vida nocturna",
    "description": "Bares, discotecas y espacios de entretenimiento nocturno."
  }
}
```

---

# 5. Lugares turísticos

## GET `/places`

Lista lugares turísticos aprobados.

**Ruta pública.**

Soporta paginación, búsqueda y filtro por categoría.

**Ejemplos:**

```txt
GET /api/places
GET /api/places?page=1&limit=10
GET /api/places?categoryId=1
GET /api/places?search=playa
```

**Respuesta esperada:**

```json
{
  "page": 1,
  "limit": 10,
  "total": 2,
  "data": [
    {
      "id": 1,
      "title": "Parque Nacional Canaima",
      "description": "Destino turístico natural reconocido por sus tepuyes.",
      "location": "Bolívar, Venezuela",
      "categoryId": 4,
      "type": "lugar",
      "ratingAverage": 5,
      "status": "approved"
    }
  ]
}
```

---

## GET `/places/:id`

Obtiene el detalle de un lugar turístico aprobado.

**Ruta pública.**

**Ejemplo:**

```txt
GET /api/places/1
```

---

## POST `/places`

Permite a un usuario autenticado registrar un nuevo lugar turístico.

**Ruta protegida. Usuario registrado o administrador.**

**Headers:**

```txt
Authorization: Bearer jwt_token
```

**Body:**

```json
{
  "title": "Salto Ángel",
  "description": "El salto de agua más alto del mundo.",
  "location": "Parque Nacional Canaima, Bolívar",
  "categoryId": 4,
  "type": "lugar"
}
```

**Respuesta esperada:**

```json
{
  "message": "Lugar enviado correctamente. Queda pendiente de aprobación.",
  "data": {
    "id": 123,
    "title": "Salto Ángel",
    "status": "pending"
  }
}
```

---

# 6. Administración

## GET `/admin/places/pending`

Lista lugares pendientes de aprobación.

**Ruta protegida. Solo administrador.**

**Headers:**

```txt
Authorization: Bearer jwt_token
```

---

## PATCH `/admin/places/:id/approve`

Aprueba un lugar turístico.

**Ruta protegida. Solo administrador.**

**Ejemplo:**

```txt
PATCH /api/admin/places/123/approve
```

---

## PATCH `/admin/places/:id/reject`

Rechaza un lugar turístico.

**Ruta protegida. Solo administrador.**

**Ejemplo:**

```txt
PATCH /api/admin/places/123/reject
```

---

# 7. Reseñas

## GET `/places/:id/reviews`

Lista las reseñas publicadas para un lugar.

**Ruta pública.**

**Ejemplo:**

```txt
GET /api/places/1/reviews
```

---

## POST `/places/:id/reviews`

Permite a un usuario autenticado publicar una reseña para un lugar aprobado.

**Ruta protegida. Usuario registrado o administrador.**

**Headers:**

```txt
Authorization: Bearer jwt_token
```

**Body:**

```json
{
  "rating": 5,
  "comment": "Excelente experiencia turística."
}
```

---

## DELETE `/places/:id/reviews/:reviewId`

Permite eliminar una reseña propia.

**Ruta protegida. Usuario registrado o administrador.**

**Ejemplo:**

```txt
DELETE /api/places/1/reviews/10
```

---

# 8. IA

## POST `/ai/chat`

Permite enviar una pregunta al asistente turístico de TurismoVE.

**Ruta pública.**

**Body:**

```json
{
  "message": "Recomiéndame destinos de playa en Venezuela"
}
```

**Respuesta esperada:**

```json
{
  "reply": "Respuesta generada por el asistente turístico."
}
```

---

# 9. Rutas planificadas para siguientes módulos

## Fotos

```txt
GET    /api/places/:id/photos
POST   /api/places/:id/photos
DELETE /api/photos/:id
```

---

# 10. Usuario administrador de prueba

```txt
Correo: admin@turismove.com
Contraseña: Admin1234
```

---

# 11. Resumen de cumplimiento

| Requisito              | Estado                        |
| ---------------------- | ----------------------------- |
| Servidor backend       | Implementado                  |
| Rutas REST             | Implementado                  |
| Autenticación          | Implementado                  |
| Autorización por roles | Implementado                  |
| Caché básico           | Implementado                  |
| Paginación y filtros   | Implementado                  |
| Reseñas                | Implementado                  |
| IA                     | Implementado                  |
| Deploy                 | Preparado                     |
| Base de datos real     | Implementado con MySQL + Sequelize |
