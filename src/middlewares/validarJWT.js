// IMPORTACIONES DE TERCEROS
const jwt = require("jsonwebtoken");

/**
 * @description Middleware para validar el token JWT en las peticiones
 * @param {Object} req - La petición
 * @param {Object} res - La respuesta
 * @param {Function} next - La función next
 * @returns {JSON} Respuesta con error si el token no es válido o falta
 */
const validarJWT = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: "No hay token en la petición.",
        });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const tokenData = {
            uid: payload.uid,
            nombre: payload.nombre,
            rol: payload.rol,
        };

        req.tokenData = tokenData;

        next();
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            ok: false,
            message: "Token no válido.",
        });
    }
};

// EXPORTAR FUNCIONES
module.exports = { validarJWT };
