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

module.exports = { verificarRol };

// EXPORTAR FUNCIONES
module.exports = { verificarRol };
