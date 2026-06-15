# TurismoVE Explorer — Frontend

Frontend de la plataforma **TurismoVE Explorer**, una aplicación web para registrar, organizar y promocionar sitios turísticos, experiencias y servicios relacionados con el turismo en Venezuela.

---

## Stack tecnológico

- **Framework:** React 18 + Vite
- **Routing:** React Router DOM v6
- **HTTP:** Axios
- **Íconos:** Lucide React
- **Estilos:** CSS moderno con variables CSS (sin frameworks externos)
- **IA:** OpenAI GPT-3.5 via backend

---

## Requisitos previos

- Node.js v18 o superior
- Backend de TurismoVE corriendo (local o Koyeb)

---

## Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/tu-equipo/TURISMOVE.git
cd TURISMOVE/frontend

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env
# Editar .env con la URL del backend

# Iniciar en modo desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

---

## Variables de entorno

```env
# Local
VITE_API_URL=http://localhost:4000/api

# Producción
VITE_API_URL=https://URL-DE-KOYEB/api
```

---

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el build de producción en `/dist` |
| `npm run preview` | Previsualiza el build de producción |

---

## Rutas principales

| Ruta | Descripción | Acceso |
|---|---|---|
| `/` | Página principal con lugares y experiencias | Público |
| `/buscar` | Búsqueda y filtros de alojamientos | Público |
| `/lugares/:id` | Detalle de un lugar turístico | Público |
| `/publicar` | Formulario para publicar nuevo lugar | Autenticado |
| `/mis-publicaciones` | Gestión de publicaciones propias | Autenticado |
| `/perfil` | Configuración del perfil de usuario | Autenticado |
| `/admin` | Panel de administración | Solo admin |

---

## Estructura del proyecto

```
frontend/src/
├── components/
│   ├── layout/        Navbar, Footer, Layout
│   ├── ui/            PlaceCard, ExperienceCard, StarRating, ReviewModal
│   ├── auth/          LoginForm, RegisterForm, AuthModal
│   ├── home/          HeroBanner, CategoryGrid, RecommendedPlaces...
│   ├── search/        PlaceFilters, PlaceListItem
│   ├── publish/       PublishPlaceForm, PlaceTabs
│   ├── publications/  PublicationCard, EditPlaceModal
│   ├── admin/         PendingPlaceCard, AdminActions
│   ├── profile/       UpdateNameForm, AvatarUpdate, ChangePasswordForm
│   └── chatbot/       ChatWidget, ChatWindow, ChatMessage
├── pages/             Home, Search, PlaceDetail, PublishPlace...
├── context/           AuthContext
├── services/          api.js
└── utils/             storage.js, normalizeResponse.js
```

---

## Deploy en Vercel

Configuración sugerida en Vercel:

```
Root Directory:   frontend
Framework Preset: Vite
Build Command:    npm run build
Output Directory: dist
```

Variable de entorno en Vercel:

```
VITE_API_URL=https://URL-DE-KOYEB/api
```

---

## Estado del proyecto

| Módulo | Estado |
|---|---|
| Home con lugares y experiencias | ✅ Completo |
| Auth (login, registro, avatar) | ✅ Completo |
| Búsqueda con filtros | ✅ Completo |
| Detalle de lugar | ✅ Completo |
| Publicar lugar/experiencia | ✅ Completo |
| Mis publicaciones | ✅ Completo |
| Perfil de usuario | ✅ Completo |
| Panel de administración | ✅ Completo |
| Chatbot IA (OpenAI) | ✅ Completo |
| Reseñas con calificación | 🔜 Backend listo, frontend próximamente |

---

## Equipo

- Luis López — Coordinador, backend, integración
- Aguilera Valeria — Layout, formularios, admin
- Carlos Cabello — Auth, publicaciones, admin actions
- Luis Cortez — Cards, búsqueda, detalle, chatbot
- María Navarro — Footer, filtros, perfil, chatbot widget
- César Peraza — Home, modales, stars, README
