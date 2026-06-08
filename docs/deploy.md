# Deploy del Proyecto - TurismoVE

## 1. Objetivo

Este documento describe la propuesta de despliegue del proyecto integrador **TurismoVE**.

La arquitectura de despliegue separa el frontend y el backend para facilitar mantenimiento, escalabilidad y organización del proyecto.

## 2. Servicios propuestos

| Componente    | Tecnología        | Plataforma sugerida        |
| ------------- | ----------------- | -------------------------- |
| Frontend      | React + Vite      | Vercel o Netlify           |
| Backend       | Node.js + Express | Render o Railway           |
| Base de datos | MySQL             | AlwaysData, Railway u otro proveedor compatible |

## 3. Deploy del backend en Render

### 3.1 Configuración general

En Render se debe crear un nuevo servicio tipo **Web Service** conectado al repositorio de GitHub.

Configuración sugerida:

```txt
Root Directory: backend
Environment: Node
Build Command: npm install
Start Command: npm start
```

### 3.2 Variables de entorno

Agregar en Render las siguientes variables:

```txt
PORT=4000
JWT_SECRET=clave_segura_para_produccion
NODE_ENV=production
FRONTEND_URL=https://url-del-frontend.vercel.app
DATABASE_URL=mysql://USUARIO:PASSWORD@HOST:3306/NOMBRE_BASE_DATOS
```

Nota: `JWT_SECRET` debe ser reemplazado por una clave segura.

### 3.3 Endpoint de verificación

Después del deploy, se puede verificar el backend con:

```txt
GET https://url-del-backend.onrender.com/api/health
```

Respuesta esperada:

```json
{
  "status": "ok",
  "service": "TurismoVE Backend",
  "version": "1.0.0"
}
```

## 4. Deploy del frontend en Vercel

El frontend se desplegará de forma independiente.

Configuración sugerida:

```txt
Root Directory: frontend
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

Variable de entorno sugerida para el frontend:

```txt
VITE_API_URL=https://url-del-backend.onrender.com/api
```

## 5. Flujo de comunicación en producción

```mermaid
flowchart LR
    A[Usuario] --> B[Frontend en Vercel]
    B --> C[Backend en Render]
    C --> D[(MySQL)]
```

## 6. Consideraciones para producción

Para producción se deben considerar los siguientes puntos:

- No subir archivos `.env` al repositorio.
- Configurar correctamente `FRONTEND_URL` en el backend.
- Configurar correctamente `VITE_API_URL` en el frontend.
- Verificar CORS.
- Probar `/api/health` después del deploy.
- Probar login y rutas protegidas.
- Mantener documentación actualizada.

## 7. Estado actual del deploy

| Elemento                       | Estado    |
| ------------------------------ | --------- |
| Backend preparado para deploy  | Sí        |
| Variables de entorno definidas | Sí        |
| Endpoint health creado         | Sí        |
| Frontend preparado             | Pendiente |
| Base de datos MySQL externa    | Preparada |
| Deploy final                   | Pendiente |

## 8. Comandos locales del backend

Instalar dependencias:

```bash
npm install
```

Ejecutar en desarrollo:

```bash
npm run dev
```

Ejecutar en producción:

```bash
npm start
```

## 9. Conclusión

El backend de TurismoVE está preparado para desplegarse en Render o Railway. La separación entre frontend y backend permite cumplir con la arquitectura solicitada en la Tarea 4 del Proyecto Integrador.
