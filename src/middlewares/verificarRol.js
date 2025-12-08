const verificarRol = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!rolesPermitidos.includes(req.tokenData.rol)) {
            return res
                .status(403)
                .json({ ok: false, message: "Acceso denegado" });
        }
        next();
    };
};

// EXPORTAR FUNCIONES
module.exports = { verificarRol };
