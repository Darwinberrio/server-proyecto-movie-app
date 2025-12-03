/**
 * Función que verifica el rol del usuario
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @param {String} rol 
 * @returns Si el rol del usuario no coincide con el rol requerido devuelve error 403, si no pasa al siguiente middleware
 */
const verificarRol = (rol) => (req, res, next) => {
    if (req.tokenData.rol !== rol) {
        return res.status(403).json({ ok: false, message: "Acceso denegado" });
    }
    next();
};

// EXPORTAR FUNCIONES
module.exports = { verificarRol };
