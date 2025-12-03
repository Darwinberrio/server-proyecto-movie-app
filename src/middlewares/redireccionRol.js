// IMPORTACIONES DE TERCEROS
const jwt = require("jsonwebtoken");

// FUNCIONES MIDDLEWARE
/**
 * Función que redirige a los usuarios según el rol del usuario
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @returns Usuario con rol User redirige a ruta /movies o usuario con rol Admin redirige a /dashboard
 */
const redireccionRol = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return next();

    const token = authHeader.split(" ")[1];
    if (!token) return next();

    try {
        const { rol } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (rol === "admin") return res.redirect("/movies");
        if (rol === "user") return res.redirect("/dashboard");
        next();
    } catch (err) {
        next();
    }
};

// EXPORTAR FUNCIONES
module.exports = { redireccionRol };
