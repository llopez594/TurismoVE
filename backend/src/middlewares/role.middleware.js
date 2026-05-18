export function authorizeRoles(...allowedRoles) {
    return function roleMiddleware(req, res, next) {
        if (!req.user) {
            return res.status(401).json({
                message: "No autorizado. Debe iniciar sesión."
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Acceso denegado. No tiene permisos para esta acción."
            });
        }

        next();
    };
}