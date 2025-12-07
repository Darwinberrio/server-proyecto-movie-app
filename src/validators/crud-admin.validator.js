// EXPORTACIONES DE TERCEROS
const { check } = require("express-validator");

// EXPORTACIONES PROPIAS


const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"]

// VALIDADORES
/**
 * Validadores de campos para crear películas
 */
const validarCrearPelicula = [
    check("titulo")
    .notEmpty().withMessage("El campo título no puede estar vacío"),
    check("url_imagen").custom((value, { req }) => {

        //valida si se ha recibido un archivo
        if (!req.file) {
            throw new Error("El campo imagen no puede estar vacío");
        }

        //valida el tipo de archivo
        if (!allowedMimeTypes.includes(req.file.mimetype)) {
            throw new Error("Solo se permiten archivos de imagen (jpg, jpeg, png, gif, webp)");
    }
        return true;
    }),    
    check("anio")
    .notEmpty().withMessage("El campo año no puede estar vacío")
    .isNumeric().withMessage("El campo año no puede contener letras"),
    check("director")
    .notEmpty().withMessage("El campo director no puede estar vacío"),
    check("genero")
    .notEmpty().withMessage("El campo genero no puede estar vacío"),
    check("duracion")
    .notEmpty().withMessage("El campo duración no puede estar vacío")
    .isNumeric().withMessage("El campo duración no puede contener letras")
];

/**
 * Validadores de campos para editar películas
 */
const validarEditarPelicula = [
    check("titulo")
    .notEmpty().withMessage("El campo título no puede estar vacío"),
    check("url_imagen").custom((value, { req }) => {

        // Si NO se ha enviado archivo, es opcional → OK
        if (!req.file) {
            return true;
        }

        //valida el tipo de extension
        if (!allowedMimeTypes.includes(req.file.mimetype)) {
                throw new Error("Solo se permiten archivos de imagen (jpg, jpeg, png, gif, webp)");
        }

        //valida el tipo de archivo
        
        return true;
    }),
    check("anio")
    .notEmpty().withMessage("El campo año no puede estar vacío")
    .isNumeric().withMessage("El campo año no puede contener letras"),
    check("director")
    .notEmpty().withMessage("El campo director no puede estar vacío"),
    check("genero")
    .notEmpty().withMessage("El campo genero no puede estar vacío"),
    check("duracion")
    .notEmpty().withMessage("El campo duración no puede estar vacío")
    .isNumeric().withMessage("El campo duración no puede contener letras")
];

// EXPORTAR VALIDADORES
module.exports = {validarCrearPelicula, validarEditarPelicula};