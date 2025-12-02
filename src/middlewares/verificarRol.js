const verificarRol = (rol) => (req, res, next) => {
    if (req.tokenData.rol !== rol) {
        return res.status(403).json({ ok: false, message: "Acceso denegado" });
    }
    next();
};

module.exports = { verificarRol };
