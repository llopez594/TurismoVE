export function notFound(req, res) {
    return res.status(404).json({
        message: "Ruta no encontrada.",
        path: req.originalUrl
    });
}

export function errorHandler(error, req, res, next) {
    console.error(error);

    return res.status(error.status || 500).json({
        message: error.message || "Error interno del servidor."
    });
}