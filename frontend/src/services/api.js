import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api"
});

// Agregar token en cada request si existe
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("turismove_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Manejar errores globales
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("turismove_token");
            localStorage.removeItem("turismove_user");
        }
        return Promise.reject(error);
    }
);

// Normalizar respuestas cacheadas del backend
// A veces el backend retorna { cached: true, data: { ... } }
// y otras veces retorna directamente { total, data: [...] }
export function unwrapResponse(data) {
    if (data?.cached && data?.data) return data.data;
    return data;
}

export default api;
