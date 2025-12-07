// IMPORTACIONES DE TERCEROS
const { validationResult } = require("express-validator");

// FUNCIONES MIDDLEWARE
/**
 * Función que valida los campos de las peticiones (checks)
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @returns Si hay error devuelve errores 400, si no pasa al siguiente middleware
 */
const validarCampos = (req, res, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            //convierte los errores en array y los une en un string separado por saltos de línea
            errores: errores.array().map(e => e.msg).join('<br>')
        });
    }

    next();
};

// EXPORTAR FUNCIONES
module.exports = { validarCampos };
